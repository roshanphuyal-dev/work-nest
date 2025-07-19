###Learning and project

// 📁 File Structure Overview for Assignment Algorithm Integration

/backend
├── controllers
│ └── assignmentController.js // Controller for assigning team
├── models
│ ├── User.js // Updated User schema with assignedProjects
│ └── Project.js // Updated Project schema with team assignments
├── routes
│ └── assignmentRoutes.js // API route for triggering assignment
├── utils
│ ├── getEligibleUsers.js // Role/level/availability filter
│ └── assignOptimalUsers.js // Cost matrix + fallback assignment logic

/frontend
├── src
│ ├── pages
│ │ └── projects
│ │ └── CreateProject.js // Add API call to trigger assignment after project creation
│ └── api
│ └── assignTeam.js // API utility to hit backend route

// ✅ Backend Implementation

// 📄 models/User.js (simplified excerpt)
const mongoose = require('mongoose');

const AssignedProjectSchema = new mongoose.Schema({
projectId: mongoose.Schema.Types.ObjectId,
startDate: Date,
endDate: Date,
});

const UserSchema = new mongoose.Schema({
name: String,
roles: [String],
level: String,
assignedProjects: [AssignedProjectSchema]
});

module.exports = mongoose.model('User', UserSchema);

// 📄 models/Project.js
const ProjectSchema = new mongoose.Schema({
title: String,
type: String,
requiredRoles: [String],
difficulty: String,
startDate: Date,
estimatedEndDate: Date,
assignedTeam: [
{
role: String,
userId: mongoose.Schema.Types.ObjectId,
name: String,
level: String,
assignedStartDate: Date,
assignedEndDate: Date,
}
]
});

module.exports = mongoose.model('Project', ProjectSchema);

// 📄 utils/getEligibleUsers.js (already implemented earlier)
// ➕ Update it slightly to return unavailable users with future start date

// 📄 utils/assignOptimalUsers.js (with fallback logic)
const munkres = require('munkres-js');

const assignOptimalUsers = (taskRoles, allUsers, difficulty, projectStart, projectEnd, getEligibleUsers) => {
const eligibleMap = {};
const fallbackMap = {};
const allCandidates = [];

taskRoles.forEach(role => {
const eligible = getEligibleUsers(allUsers, role, difficulty, projectStart, projectEnd);
const fallback = getEligibleUsers(allUsers, role, difficulty, null, null); // without date filter
eligibleMap[role] = eligible;
fallbackMap[role] = fallback;
allCandidates.push(...eligible);
});

const uniqueUsers = [...new Map(allCandidates.map(u => [u._id.toString(), u])).values()];

const costMatrix = taskRoles.map(role => {
return uniqueUsers.map(user => {
const found = eligibleMap[role].find(u => u.\_id.toString() === user.\_id.toString());
return found ? (found.levelScore + found.availabilityScore) : 1000; // High cost for ineligible
});
});

const assignments = munkres(costMatrix);

return assignments.map(([taskIndex, userIndex]) => {
const role = taskRoles[taskIndex];
const user = uniqueUsers[userIndex];
const eligible = eligibleMap[role].find(u => u.\_id.toString() === user.\_id.toString());

    // fallback if not available now
    if (!eligible) {
      const fallbackUser = fallbackMap[role].find(u => u._id.toString() === user._id.toString());
      const futureDate = fallbackUser?.assignedProjects?.reduce((latest, p) => {
        const date = new Date(p.endDate);
        return date > latest ? date : latest;
      }, new Date());

      const newStart = new Date(futureDate);
      newStart.setDate(newStart.getDate() + 1);
      const newEnd = new Date(newStart);
      newEnd.setDate(newStart.getDate() + 7);

      return {
        role,
        userId: user._id,
        userName: user.name,
        level: user.level,
        assigned: true,
        startDate: newStart,
        endDate: newEnd,
        note: 'Assigned based on future availability'
      };
    }

    return {
      role,
      userId: user._id,
      userName: user.name,
      level: user.level,
      assigned: true,
      startDate: projectStart,
      endDate: projectEnd,
      note: 'Assigned based on optimal cost'
    };

});
};

module.exports = assignOptimalUsers;

// 📄 controllers/assignmentController.js
const getEligibleUsers = require('../utils/getEligibleUsers');
const assignOptimalUsers = require('../utils/assignOptimalUsers');
const User = require('../models/User');
const Project = require('../models/Project');

const assignTeamToProject = async (req, res) => {
try {
const projectId = req.params.projectId;
const project = await Project.findById(projectId);
const allUsers = await User.find({});

    const assignments = assignOptimalUsers(
      project.requiredRoles,
      allUsers,
      project.difficulty,
      project.startDate,
      project.estimatedEndDate,
      getEligibleUsers
    );

    project.assignedTeam = assignments;
    await project.save();

    // update users
    for (let assignment of assignments) {
      await User.findByIdAndUpdate(assignment.userId, {
        $push: {
          assignedProjects: {
            projectId: project._id,
            startDate: assignment.startDate,
            endDate: assignment.endDate,
          }
        }
      });
    }

    return res.status(200).json({ success: true, assignments });

} catch (err) {
console.error(err);
return res.status(500).json({ success: false, message: 'Assignment failed' });
}
};

module.exports = { assignTeamToProject };

// 📄 routes/assignmentRoutes.js
const express = require('express');
const { assignTeamToProject } = require('../controllers/assignmentController');
const router = express.Router();

router.post('/assign/:projectId', assignTeamToProject);

module.exports = router;

// 📄 frontend/src/api/assignTeam.js
import axios from 'axios';

export const assignTeam = async (projectId) => {
const response = await axios.post(`/api/assign/${projectId}`);
return response.data;
};

// 📄 frontend/src/pages/projects/CreateProject.js (snippet after creating project)
import { assignTeam } from '@/api/assignTeam';

const handleSubmit = async () => {
const project = await createProject(formData);
const assignment = await assignTeam(project.\_id);
console.log('Assigned team:', assignment);
};

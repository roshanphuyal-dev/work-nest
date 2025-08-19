import "dotenv/config";
import mongoose from "mongoose";
import UserModel from "../models/user.model";
import { config } from "../config/app.config";

const skillLevelMapping = {
  INTERN: "BEGINNER",
  JUNIOR: "INTERMEDIATE",
  MID_LEVEL: "ADVANCED",
  SENIOR: "EXPERT",
};

async function migrateSkillLevels() {
  try {
    // Connect to database
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to database");

    // Find all users with old skill levels
    const users = await UserModel.find({
      skillLevel: { $in: Object.keys(skillLevelMapping) },
    });

    console.log(`Found ${users.length} users to migrate`);

    // Update each user
    for (const user of users) {
      const oldSkillLevel = user.skillLevel as string;
      const newSkillLevel =
        skillLevelMapping[oldSkillLevel as keyof typeof skillLevelMapping];

      if (newSkillLevel) {
        await UserModel.updateOne(
          { _id: user._id },
          { $set: { skillLevel: newSkillLevel } }
        );
        console.log(
          `Updated user ${user.email}: ${oldSkillLevel} -> ${newSkillLevel}`
        );
      }
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateSkillLevels();
}

export default migrateSkillLevels;

import { Router } from "express";
import {
  getCurrentUserController,
  changePasswordController,
  updateUserSkillsController,
  updateUserSkillLevelController,
  updateUserProfileController,
} from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/change-password", isAuthenticated, changePasswordController);
userRoutes.put("/skills", isAuthenticated, updateUserSkillsController);
userRoutes.put("/skill-level", isAuthenticated, updateUserSkillLevelController);
userRoutes.patch(
  "/update-profile",
  isAuthenticated,
  updateUserProfileController
);

export default userRoutes;

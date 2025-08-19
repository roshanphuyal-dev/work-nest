import { Router } from "express";
import { getCurrentUserController, changePasswordController, updateUserSkillsController, updateUserSkillLevelController } from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated.middleware";

const userRoutes = Router();

userRoutes.get("/current", getCurrentUserController);
userRoutes.post("/change-password", isAuthenticated, changePasswordController);
userRoutes.put("/skills", isAuthenticated, updateUserSkillsController);
userRoutes.put("/skill-level", isAuthenticated, updateUserSkillLevelController);

export default userRoutes;

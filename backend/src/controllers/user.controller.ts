import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  getCurrentUserService,
  changePasswordService,
  updateUserSkillsService,
  updateUserSkillLevelService,
} from "../services/user.service";
import { changePasswordSchema } from "../validation/auth.validation";
import { BadRequestException } from "../utils/appError";

export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { user } = await getCurrentUserService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "User fetch successfully",
      user,
    });
  }
);

export const changePasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    
    // Validate request body
    const validationResult = changePasswordSchema.safeParse(req.body);
    if (!validationResult.success) {
      throw new BadRequestException(
        validationResult.error.errors[0]?.message || "Invalid input"
      );
    }

    const { currentPassword, newPassword } = validationResult.data;

    await changePasswordService(userId, currentPassword, newPassword);

    return res.status(HTTPSTATUS.OK).json({
      message: "Password changed successfully",
    });
  }
);

export const updateUserSkillsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      throw new BadRequestException("Skills must be an array");
    }

    await updateUserSkillsService(userId, skills);

    return res.status(HTTPSTATUS.OK).json({
      message: "Skills updated successfully",
    });
  }
);

export const updateUserSkillLevelController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { skillLevel } = req.body;

    if (!skillLevel || !['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'].includes(skillLevel)) {
      throw new BadRequestException("Invalid skill level");
    }

    await updateUserSkillLevelService(userId, skillLevel);

    return res.status(HTTPSTATUS.OK).json({
      message: "Skill level updated successfully",
    });
  }
);

import UserModel from "../models/user.model";
import { BadRequestException, UnauthorizedException } from "../utils/appError";

export const getCurrentUserService = async (userId: string) => {
  const user = await UserModel.findById(userId)
    .populate("currentWorkspace")
    .select("-password");

  if (!user) {
    throw new BadRequestException("User not found");
  }

  return {
    user,
  };
};

export const changePasswordService = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  // Find user with password field
  const user = await UserModel.findById(userId).select("+password");
  
  if (!user) {
    throw new BadRequestException("User not found");
  }

  // Verify current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw new UnauthorizedException("Current password is incorrect");
  }

  // Check if new password is different from current
  const isSamePassword = await user.comparePassword(newPassword);
  if (isSamePassword) {
    throw new BadRequestException("New password must be different from current password");
  }

  // Update password (will be hashed by pre-save middleware)
  user.password = newPassword;
  await user.save();

  return {
    message: "Password changed successfully",
  };
};

export const updateUserSkillsService = async (
  userId: string,
  skills: string[]
) => {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    throw new BadRequestException("User not found");
  }

  user.userSkills = skills;
  await user.save();

  return {
    message: "Skills updated successfully",
  };
};

export const updateUserSkillLevelService = async (
  userId: string,
  skillLevel: string
) => {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    throw new BadRequestException("User not found");
  }

  user.skillLevel = skillLevel as any;
  await user.save();

  return {
    message: "Skill level updated successfully",
  };
};

import mongoose, { Document, Schema } from "mongoose";
import { SkillCategory, SkillCategoryType, SkillProficiency, SkillProficiencyType } from "../enums/skill-category.enums";

export interface SkillDocument extends Document {
  name: string;
  category: SkillCategoryType;
  proficiency: SkillProficiencyType;
  user: mongoose.Types.ObjectId;
  yearsOfExperience: number;
  isVerified: boolean;
  verifiedBy?: mongoose.Types.ObjectId;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const skillSchema = new Schema<SkillDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(SkillCategory),
    },
    proficiency: {
      type: String,
      required: true,
      enum: Object.values(SkillProficiency),
      default: SkillProficiency.BEGINNER,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    lastUsed: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure unique skill per user
skillSchema.index({ user: 1, name: 1, category: 1 }, { unique: true });

// Index for efficient querying by category and proficiency
skillSchema.index({ category: 1, proficiency: 1 });

const SkillModel = mongoose.model<SkillDocument>("Skill", skillSchema);
export default SkillModel;

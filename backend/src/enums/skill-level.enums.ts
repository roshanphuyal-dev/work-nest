export const SkillLevel = {
  INTERN: "INTERN",
  JUNIOR: "JUNIOR",
  MID_LEVEL: "MID_LEVEL",
  SENIOR: "SENIOR",
} as const;

export type SkillType = keyof typeof SkillLevel;

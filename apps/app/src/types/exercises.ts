export enum MuscleGroup {
  Abs = "Abs",
  Back = "Back",
  Biceps = "Biceps",
  Calves = "Calves",
  Chest = "Chest",
  Forearms = "Forearms",
  Glutes = "Glutes",
  Hamstrings = "Hamstrings",
  Lats = "Lats",
  Quadriceps = "Quadriceps",
  Shoulders = "Shoulders",
  Trapezius = "Trapezius",
  Triceps = "Triceps",
}

export interface Exercise {
  id: number;
  name: string;
  muscle_groups: MuscleGroup[];
  equipment: string[];
  exercise_type: string;
  movement_pattern: string;
  primary_joint_action: string;
  instructions: string;
  tips: string[];
  common_mistakes: string[];
  variations: string[];
}

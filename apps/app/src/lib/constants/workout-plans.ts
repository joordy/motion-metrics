import type { STANDARD_PLAN } from "@/types/workout";

export const DAY_FREQUENCIES = [
  { name: "Monday", value: "0" },
  { name: "Tuesday", value: "1" },
  { name: "Wednesday", value: "2" },
  { name: "Thursday", value: "3" },
  { name: "Friday", value: "4" },
  { name: "Saturday", value: "5" },
  { name: "Sunday", value: "6" },
];

export const STANDARD_WORKOUT_PLANS: STANDARD_PLAN[] = [
  {
    name: "Full Body",
    id: "full-body",
    days: 3,
    description:
      "A comprehensive full-body program designed for three training days per week. Each session targets all major muscle groups with compound movements for maximum efficiency.",
    workouts: [
      {
        name: "Full Body - Day 1",
        uuid: "67e55044-10b1-426f-9247-bb680e5fe0c8",
        exercises: [
          {
            name: "Barbell Squat",
            sets: Array(3).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Bench Press",
            sets: Array(3).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Deadlift",
            sets: Array(3).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Military Press",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Pull-ups",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Dips",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
        ],
        type: "standard",
        frequency: ["0"],
        description:
          "Heavy compound movements focusing on strength and muscle development across all major muscle groups",
      },
      {
        name: "Full Body - Day 2",
        uuid: "8f7d3c1e-9b5a-4e6d-8f2c-7d5e9a4b3c2d",
        exercises: [
          {
            name: "Front Squat",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Incline Dumbbell Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Barbell Rows",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Standing Dumbbell Press",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Chin-ups",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Skull Crushers",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
        ],
        type: "standard",
        frequency: ["2"],
        description:
          "Moderate intensity full body workout with focus on hypertrophy and complementary exercises",
      },
      {
        name: "Full Body - Day 3",
        uuid: "9a8b7c6d-5e4f-3d2c-1b0a-9f8e7d6c5b4a",
        exercises: [
          {
            name: "Romanian Deadlift",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Incline Barbell Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "T-Bar Rows",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Arnold Press",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Weighted Pull-ups",
            sets: Array(3).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Close-Grip Bench Press",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
        ],
        type: "standard",
        frequency: ["4"],
        description:
          "Final full body session of the week incorporating variations of main lifts and additional volume",
      },
    ],
  },
  {
    name: "Upper/Lower",
    id: "upper-lower",
    days: 4,
    description:
      "A four-day training split that alternates between upper and lower body workouts, providing optimal frequency and recovery while allowing for focused training sessions. This split is ideal for intermediate lifters looking to build strength and muscle mass efficiently.",
    workouts: [
      {
        name: "Upper — 1",
        uuid: "b1c2d3e4-f5g6-h7i8-j9k0-l1m2n3o4p5q",
        type: "standard",
        frequency: ["0"],
        description:
          "Upper body workout focusing on compound movements and strength development",
        exercises: [
          {
            name: "Bench Press",
            sets: Array(5).fill({ reps: "6", targetWeight: "0" }),
          },
          {
            name: "Weighted Pull-ups",
            sets: Array(4).fill({ reps: "6", targetWeight: "0" }),
          },
          {
            name: "Military Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Barbell Rows",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Incline Dumbbell Press",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Face Pulls",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Lower — 1",
        uuid: "c2d3e4f5-g6h7-i8j9-k0l1-m2n3o4p5q6r",
        type: "standard",
        frequency: ["1"],
        description:
          "Lower body workout emphasizing quad development and posterior chain",
        exercises: [
          {
            name: "Barbell Squat",
            sets: Array(5).fill({ reps: "6", targetWeight: "0" }),
          },
          {
            name: "Romanian Deadlift",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Leg Press",
            sets: Array(4).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Standing Calf Raises",
            sets: Array(4).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Hanging Leg Raises",
            sets: Array(3).fill({ reps: "15", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Upper — 2",
        uuid: "d3e4f5g6-h7i8-j9k0-l1m2-n3o4p5q6r7s",
        frequency: ["3"],
        description:
          "Upper body hypertrophy focused workout with emphasis on volume",
        type: "standard",
        exercises: [
          {
            name: "Incline Barbell Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Chin-ups",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Dumbbell Shoulder Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "T-Bar Rows",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Dips",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Barbell Curls",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Lower — 2",
        uuid: "e4f5g6h7-i8j9-k0l1-m2n3-o4p5q6r7s8t",
        frequency: ["4"],
        description:
          "Lower body strength and conditioning workout with deadlift focus",
        type: "standard",
        exercises: [
          {
            name: "Deadlift",
            sets: Array(5).fill({ reps: "5", targetWeight: "0" }),
          },
          {
            name: "Front Squat",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Walking Lunges",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Seated Calf Raises",
            sets: Array(4).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Cable Crunches",
            sets: Array(3).fill({ reps: "15", targetWeight: "0" }),
          },
        ],
      },
    ],
  },
  {
    name: "Push, Pull, Legs",
    id: "push-pull-legs",
    days: 6,
    description:
      "A comprehensive six-day training split that separates workouts into pushing movements, pulling movements, and leg exercises. This high-frequency program is ideal for advanced lifters who can handle higher training volumes and want to maximize muscle growth through specialized training days.",
    workouts: [
      {
        name: "Push — 1",
        uuid: "f5g6h7i8-j9k0-l1m2-n3o4-p5q6r7s8t9u",
        type: "standard",
        frequency: ["0"],
        description:
          "Push workout focusing on chest, shoulders, and triceps development",
        exercises: [
          {
            name: "Bench Press",
            sets: Array(5).fill({ reps: "6", targetWeight: "0" }),
          },
          {
            name: "Incline Dumbbell Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Military Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Dips",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Lateral Raises",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Tricep Pushdowns",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Pull — 1",
        uuid: "g6h7i8j9-k0l1-m2n3-o4p5-q6r7s8t9u0v",
        type: "standard",
        frequency: ["1"],
        description: "Pull workout with deadlift focus and upper back emphasis",
        exercises: [
          {
            name: "Deadlift",
            sets: Array(5).fill({ reps: "5", targetWeight: "0" }),
          },
          {
            name: "Weighted Pull-ups",
            sets: Array(4).fill({ reps: "6", targetWeight: "0" }),
          },
          {
            name: "Barbell Rows",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Face Pulls",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Hammer Curls",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Reverse Flyes",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Legs — 1",
        uuid: "h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w",
        frequency: ["2"],
        description:
          "Leg workout emphasizing quad development and posterior chain strength",
        type: "standard",
        exercises: [
          {
            name: "Barbell Squat",
            sets: Array(5).fill({ reps: "6", targetWeight: "0" }),
          },
          {
            name: "Romanian Deadlift",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Leg Press",
            sets: Array(4).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Standing Calf Raises",
            sets: Array(4).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Hanging Leg Raises",
            sets: Array(3).fill({ reps: "15", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Push — 2",
        uuid: "i8j9k0l1-m2n3-o4p5-q6r7-s8t9u0v1w2x",
        frequency: ["3"],
        description:
          "Push workout with emphasis on upper chest and shoulder development",
        type: "standard",
        exercises: [
          {
            name: "Incline Barbell Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Flat Dumbbell Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Arnold Press",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Close-Grip Bench Press",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Cable Flyes",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Overhead Tricep Extensions",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Pull — 2",
        uuid: "j9k0l1m2-n3o4-p5q6-r7s8-t9u0v1w2x3y",
        frequency: ["4"],
        description:
          "Pull workout focusing on back thickness and bicep development",
        type: "standard",
        exercises: [
          {
            name: "T-Bar Rows",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Chin-ups",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "One-Arm Dumbbell Rows",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Seated Cable Rows",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Barbell Curls",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Farmer's Walks",
            sets: Array(3).fill({ reps: "30", targetWeight: "0" }),
          },
        ],
      },
      {
        name: "Legs — 2",
        uuid: "k0l1m2n3-o4p5-q6r7-s8t9-u0v1w2x3y4z",
        frequency: ["5"],
        description:
          "Leg workout with focus on quad development and unilateral movements",
        type: "standard",
        exercises: [
          {
            name: "Front Squat",
            sets: Array(4).fill({ reps: "8", targetWeight: "0" }),
          },
          {
            name: "Bulgarian Split Squats",
            sets: Array(3).fill({ reps: "10", targetWeight: "0" }),
          },
          {
            name: "Leg Extensions",
            sets: Array(3).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Seated Calf Raises",
            sets: Array(4).fill({ reps: "12", targetWeight: "0" }),
          },
          {
            name: "Cable Crunches",
            sets: Array(3).fill({ reps: "15", targetWeight: "0" }),
          },
        ],
      },
    ],
  },
];

import type { Target, Variant } from "framer-motion";

export type Direction = 1 | -1;

export type DirectionVariant = (direction: Direction) => Target;

export interface CustomVariants {
  initial: DirectionVariant;
  active: Variant;
  exit: DirectionVariant;
  [key: string]: DirectionVariant | Variant;
}

export const variants: CustomVariants = {
  initial: (direction: Direction) => ({
    x: `${110 * direction}%`,
    opacity: 0,
  }),
  active: { x: "0%", opacity: 1 },
  exit: (direction: Direction) => ({
    x: `${-110 * direction}%`,
    opacity: 0,
  }),
};

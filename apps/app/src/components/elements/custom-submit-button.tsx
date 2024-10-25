"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@motion-metrics/ui/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import Icons from "@/components/elements/icons";

const BUTTON_COPY = {
  idle: "Select plan",
  loading: (
    <Icons name="LoaderCircle" className="size-4 animate-spin text-black" />
  ),
  success: "Plan selected!",
  error: "Something went wrong, try again",
};

type ButtonState = "idle" | "loading" | "success" | "error";

interface CustomSubmitButtonProps {
  onHandleSubmit: void;
  className?: string;
}

export function CustomSubmitButton({
  onHandleSubmit,
  className,
}: CustomSubmitButtonProps) {
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const router = useRouter();

  const handleClick = async () => {
    if (buttonState !== "idle") return;
    setButtonState("loading");

    try {
      await onHandleSubmit();
      setTimeout(() => setButtonState("success"), 2000);

      toast.success("Workout plan selected successfully!");

      setTimeout(() => {
        setButtonState("idle");
        router.push("/workouts");
      }, 2000);
    } catch (error) {
      setButtonState("error");
      toast.error("Something went wrong. Please try again.");
      setTimeout(() => {
        setButtonState("idle");
      }, 2000);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={buttonState === "loading"}
      className={cn("w-full relative", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={buttonState}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
        >
          {BUTTON_COPY[buttonState]}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

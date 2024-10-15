import type { HTMLAttributes } from "react";
import { Fragment, useMemo } from "react";

import { Button } from "@motion-metrics/ui/components/ui/button";
import { CardFooter } from "@motion-metrics/ui/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { useMultiStepForm } from "@/hooks/use-multi-step-form";

interface Props extends HTMLAttributes<HTMLDivElement> {
  hidePrevious?: boolean;
  hideNext?: boolean;
  onPrevious?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  disabled?: boolean;
  jumpToStep?: number;
  jumpLabel?: string;
}

export function PaginationMultiStepForm({
  onPrevious,
  className,
  nextLabel,
  previousLabel,
  hidePrevious = false,
  hideNext = false,
  disabled = false,
  jumpToStep,
  jumpLabel,
}: Props) {
  const { state, onJumpTo } = useMultiStepForm();

  const currentStep = useMemo(() => state?.step || 0, [state?.step]);
  const totalSteps = useMemo(() => state?.total || 0, [state?.total]);

  const handleJump = () => {
    if (jumpToStep !== undefined) {
      onJumpTo(state, jumpToStep);
    }
  };

  return (
    <CardFooter
      className={cn(
        "flex flex-col space-y-3 mt-10 w-full",
        // "fixed bottom-0 left-0 right-0 flex flex-col items-center justify-between md:relative md:bottom-[initial] md:left-[initial] md:right-[initial]",
        className,
      )}
    >
      {onPrevious && !hidePrevious && (
        <Button
          type="submit"
          name="vorige"
          className={cn("w-full p-4", {
            "px-6 py-4": previousLabel,
          })}
          disabled={currentStep === 0 || disabled}
          onClick={onPrevious}
        >
          {previousLabel ? previousLabel : <ChevronLeft size={24} />}
        </Button>
      )}
      {/* {showCounter && (
        <span>
          {currentStep} / {totalSteps}
        </span>
      )} */}
      {!hideNext && (
        <Fragment>
          <Button
            disabled={currentStep === totalSteps || disabled}
            type="submit"
            className={cn("w-full p-4", {
              "px-6 py-4": nextLabel,
            })}
            name="volgende"
          >
            {nextLabel ? nextLabel : <ChevronRight size={24} />}
          </Button>
          {jumpToStep !== undefined && (
            <Button
              type="button"
              variant="outline"
              className={cn("w-full p-4", {
                "px-6 py-4": jumpLabel,
              })}
              onClick={handleJump}
            >
              {jumpLabel ? jumpLabel : "Jump"}
            </Button>
          )}
        </Fragment>
      )}
    </CardFooter>
  );
}

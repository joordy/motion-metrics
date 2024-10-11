"use client";

import type {
  ButtonType,
  ContentMap,
  LoginContent,
  RegisterStepContent,
} from "@/types/register";

import type {
  ChangeEvent,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Button } from "@motion-metrics/ui/components/ui/button";
import { Input } from "@motion-metrics/ui/components/ui/input";
import { Label } from "@motion-metrics/ui/components/ui/label";
import { cn } from "@motion-metrics/ui/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

import { REGISTRATION_CONTENT_MAP } from "@/lib/constants/auth";

import useMeasure from "@/hooks/use-measure";

import Icons from "@/components/icons";
import type { Direction } from "@/components/register-form/register-form.motion";
import { variants } from "@/components/register-form/register-form.motion";

type Steps = keyof ContentMap;

type FormData = {
  [key: string]: string | boolean;
};

// Form Context
type FormContextType = {
  currentStep: Steps;
  setCurrentStep: (step: Steps) => void;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

// Custom Hooks
const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormContext must be used within a MultiStepFormProvider"
    );
  }
  return context;
};

// Components
export function MultiStepFormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Steps>("intro");
  const [formData, setFormData] = useState<FormData>({});

  const value = useMemo(
    () => ({ currentStep, setCurrentStep, formData, setFormData }),
    [currentStep, formData]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function FormStep({ step }: { step: RegisterStepContent | LoginContent }) {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex flex-col space-y-5">
      {step.blocks.map((block, index) => {
        const inputProps: InputProps = {
          type: block.type,
          id: block.id,
          name: block.id,
          placeholder: block.placeholder,
          onChange: handleInputChange,
          className: cn(
            "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50",
            {
              "h-4 w-4 mr-2 text-blue-600 focus:ring-blue-500 border-gray-300 rounded":
                block.type === "checkbox",
            }
          ),
        };

        if (block.type === "checkbox") {
          inputProps.checked = !!formData[block.id];
        } else {
          inputProps.value = (formData[block.id] as string) || "";
        }

        return (
          <div
            key={index}
            className={cn("w-full relative", {
              "flex flex-row-reverse justify-end": block.type === "checkbox",
            })}
          >
            <Label
              htmlFor={block.id}
              className={cn("block text-md font-medium", {
                "pointer-events-none absolute -top-2 bg-dark-100 left-2 px-1 mb-1":
                  block.type !== "checkbox",
              })}
            >
              {block.name}
            </Label>
            <Input {...inputProps} />
          </div>
        );
      })}
    </div>
  );
}

function StepButtons({
  step,
  onNext,
}: {
  step: RegisterStepContent | LoginContent;
  onNext: (step: Steps) => void;
}) {
  const { formData } = useFormContext();

  function isRegisterStepContent(
    step: RegisterStepContent | LoginContent
  ): step is RegisterStepContent {
    return (step as RegisterStepContent).buttons !== undefined;
  }

  return (
    <div className="flex flex-col space-y-2 mt-10">
      {isRegisterStepContent(step) &&
        step.buttons?.map((el, i) => (
          <Button
            key={i}
            onClick={() => onNext(el.nextStep as Steps)}
            className={cn(el.buttonVariant)}
          >
            {el.label}
          </Button>
        ))}
      {step.cta && (
        <Button
          type="submit"
          onClick={() => step.cta?.onClick(formData)}
          className={cn(step.cta.buttonVariant)}
        >
          {step.cta.label}
        </Button>
      )}
    </div>
  );
}

export function RegisterForm() {
  const { currentStep, setCurrentStep } = useFormContext();
  const [direction, setDirection] = useState<Direction>(1);
  const [ref, bounds] = useMeasure();

  const handleNext = useCallback(
    (nextStep: Steps) => {
      setDirection(1);
      setCurrentStep(nextStep);
    },
    [setCurrentStep]
  );

  const handlePrevious = useCallback(
    (prevStep: Steps) => {
      setDirection(-1);
      setCurrentStep(prevStep);
    },
    [setCurrentStep]
  );

  const step = REGISTRATION_CONTENT_MAP[currentStep];

  const content = useMemo(() => {
    if (!step) return <div>Error: Invalid step</div>;

    const Tag = currentStep === "intro" ? "h1" : "h2";

    return (
      <div
        className={cn("flex flex-col", {
          "items-center": currentStep === "intro",
        })}
      >
        <div
          className={cn("flex flex-col space-y-1", {
            "items-center": currentStep === "intro",
          })}
        >
          <div
            className={cn({
              "flex space-x-2 items-center": currentStep.includes("register"),
            })}
          >
            {currentStep.includes("register") && (
              <Icons
                name="ArrowLeft"
                className="cursor-pointer"
                onClick={() =>
                  handlePrevious(
                    currentStep === "registerStepOne"
                      ? "intro"
                      : "registerStepOne"
                  )
                }
              />
            )}
            <Tag
              className={cn("mb-2 leading-tight text-3xl font-semibold", {
                "text-center": currentStep === "intro",
                "mb-0": currentStep.includes("register"),
              })}
            >
              {step.heading}
            </Tag>
          </div>
          <p
            className={cn("font-light max-w-[335px]", {
              "max-w-64 text-center": currentStep === "intro",
            })}
          >
            {step.paragraph}
          </p>
        </div>
        <div className="mt-10 w-full flex flex-col gap-2">
          {step.type === "intro" &&
            step.buttons.map((el: ButtonType, i: number) => (
              <Button
                key={i}
                onClick={() => handleNext(el.nextStep as Steps)}
                className={cn(el.buttonVariant)}
              >
                {el.label}
              </Button>
            ))}
          {(step.type === "register" || step.type === "login") && (
            <>
              <FormStep step={step} />
              <StepButtons step={step} onNext={handleNext} />
            </>
          )}
        </div>
      </div>
    );
  }, [currentStep, handleNext, handlePrevious, step]);

  return (
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
      <motion.div animate={{ height: bounds?.height }}>
        <div className="p-6" ref={ref}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              variants={variants}
              initial="initial"
              animate="active"
              exit="exit"
              custom={direction}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
}

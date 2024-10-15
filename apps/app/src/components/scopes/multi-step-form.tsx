"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import {
  Children,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {} from "framer-motion";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

import type { login, signup } from "@/lib/actions/server/auth";
import type { LoginSchema } from "@/lib/schemas/login";
import type { RegisterSchema } from "@/lib/schemas/register";

import useMeasure from "@/hooks/use-measure";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { useAppState } from "@/components/scopes/app-state";

type RegisterActionType = (data: RegisterSchema) => Promise<ActionResult>;
type LoginActionType = (data: LoginSchema) => Promise<ActionResult>;

type FormStateContextType = [
  FormState,
  Dispatch<SetStateAction<FormState>>,
  RegisterActionType,
  LoginActionType,
  (direction: 1 | -1) => void,
];

export type FormState = Partial<RegisterSchema & LoginSchema> & {
  [key: string]: string | string[] | number | undefined | null;
};

export type ActionResult =
  | { type: "error"; errors: { form: string[] }; success?: undefined }
  | { success: boolean; type?: undefined; errors?: undefined };

export type MsfAction = (
  data: unknown,
) => Promise<{ success: boolean; errors?: { [key: string]: string } } | void>;

interface Props extends PropsWithChildren {
  name: string;
  signupAction: typeof signup;
  loginAction: typeof login;
  offset?: number;
}

export const FormStateContext = createContext<FormStateContextType>([
  { step: 0 },
  () => {},
  async () => ({ success: false }),
  async () => ({ success: false }),
  () => {},
]);

const variants = {
  initial: (direction: number) => ({
    y: 0,
    x: `${10 * direction}px`,
    opacity: 0,
  }),
  active: {
    y: 0,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: 0,
    x: `${-10 * direction}px`,
    opacity: 0,
  }),
};

export function MultiStepFormProvider({
  children,
  offset = 0,
  name,
  signupAction,
  loginAction,
}: Props) {
  const _children = Children.toArray(children);
  const [appState, setAppState] = useAppState();
  const [direction, setDirection] = useState<1 | -1>();
  const [ref, bounds] = useMeasure();

  const setValue = useCallback(
    (newState: FormState) => {
      setAppState((prevState) => ({ ...prevState, [name]: newState }));
    },
    [name, setAppState],
  );

  const [state, setState] = useMemo(
    () =>
      [(appState?.[name] as FormState) || {}, setValue] as [
        FormState,
        Dispatch<SetStateAction<FormState>>,
      ],
    [appState, name, setValue],
  );

  const currentStep = useMemo(() => state.step, [state.step]);

  const updateDirection = useCallback((newDirection: 1 | -1) => {
    setDirection(newDirection);
  }, []);

  const setCurrentStep = useCallback(
    (step: number | string) => {
      setDirection(() => {
        const prevStepNumber =
          typeof currentStep === "number" ? currentStep : 0;
        const newStepNumber = typeof step === "number" ? step : 0;
        return newStepNumber > prevStepNumber ? 1 : -1;
      });
      setValue({ ...state, step });
    },
    [setValue, state, currentStep],
  );

  useEffect(() => {
    if (currentStep === undefined) {
      setCurrentStep(0);
    }
    if (state.total === undefined) {
      setValue({ ...state, total: _children.length - offset });
    }
  }, [_children.length, currentStep, setCurrentStep, setValue, state, offset]);

  return (
    <FormStateContext.Provider
      value={[state, setState, signupAction, loginAction, updateDirection]}
    >
      <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
        <motion.div animate={{ height: bounds?.height }}>
          <div ref={ref}>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              {_children.map((child, index) => {
                if (
                  index === (typeof currentStep === "number" ? currentStep : 0)
                ) {
                  return (
                    <motion.div
                      key={index}
                      custom={direction}
                      variants={variants}
                      initial="initial"
                      animate="active"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      {child}
                    </motion.div>
                  );
                }
                if (index === _children.length - 1 && currentStep === "done") {
                  return <LoadingSpinner className="size-6" key={"done"} />;
                }
                return null;
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </FormStateContext.Provider>
  );
}

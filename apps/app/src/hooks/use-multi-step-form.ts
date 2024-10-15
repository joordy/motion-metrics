import { useCallback, useContext } from "react";

import type { login, signup } from "@/lib/actions/server/auth";

import type { FormState } from "@/components/scopes/multi-step-form";
import { FormStateContext } from "@/components/scopes/multi-step-form";

export function useMultiStepForm() {
  const context = useContext(FormStateContext);
  if (!context) {
    throw new Error("useFunnelState must be used within the FunnelProvider");
  }

  const [state, setState, signupAction, loginAction, updateDirection] = context;
  const saveData = useCallback(
    (data: FormState) => {
      setState({ ...state, ...data });
      return { ...state, ...data };
    },
    [state, setState],
  );

  const clearData = useCallback(() => {
    setState({ step: "done" });
  }, [setState]);

  const onPrevious = useCallback(
    (data: FormState) => {
      updateDirection(-1);
      saveData({
        ...data,
        step: Math.max(state?.step ? Number(state?.step) - 1 : 0, 0),
      });
    },
    [saveData, state?.step],
  );
  const onNext = useCallback(
    (data: FormState) => {
      updateDirection(1);
      saveData({ ...data, step: state?.step ? Number(state?.step) + 1 : 1 });
    },
    [saveData, state?.step],
  );

  const onSubmit = useCallback(
    async (
      data: FormState,
      callback: (
        data: FormState,
        action: typeof signup | typeof login,
      ) => Promise<void> | void,
      isRegister: boolean = true,
    ) => {
      const fullData = { ...state, ...data };
      const actionToUse = isRegister ? signupAction : loginAction;
      await callback(fullData, actionToUse);
    },
    [state, signupAction, loginAction],
  );

  const onJumpTo = useCallback(
    (data: FormState, stepIndex: number) => {
      saveData({ ...data, step: stepIndex });
    },
    [saveData],
  );

  return {
    onPrevious,
    onNext,
    onJumpTo,
    saveData,
    state,
    setState,
    onSubmit,
    clearData,
  };
}

"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import type { FormState } from "./multi-step-form";

type AppState = {
  [key: string]: FormState | undefined;
};

export const AppStateContext = createContext<
  [AppState, Dispatch<SetStateAction<object>>]
>([{}, () => {}]);

export function AppProvider({ children }: PropsWithChildren) {
  const value = useState({});

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within the AppProvider");
  }
  return context;
};

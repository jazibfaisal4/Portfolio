"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { FocusArea } from "@/constants";

type FocusContextValue = {
  focus: FocusArea;
  setFocus: (focus: FocusArea) => void;
};

const FocusContext = createContext<FocusContextValue | null>(null);

export function FocusProvider({ children }: { children: ReactNode }) {
  const [focus, setFocus] = useState<FocusArea>("fullstack");

  return <FocusContext.Provider value={{ focus, setFocus }}>{children}</FocusContext.Provider>;
}

export function useFocus() {
  const ctx = useContext(FocusContext);
  if (!ctx) throw new Error("useFocus must be used within FocusProvider");
  return ctx;
}

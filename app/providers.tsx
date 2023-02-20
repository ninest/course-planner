"use client";

import { Provider as JotaiProvider } from "jotai";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

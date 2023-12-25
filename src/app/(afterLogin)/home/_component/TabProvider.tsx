"use client";

import { ReactNode, createContext, useState } from "react";

export const TabContext = createContext({
  tab: "recommend",
  setTab: (value: "recommend" | "following") => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("recommend");
  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}

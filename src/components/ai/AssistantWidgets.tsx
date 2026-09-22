"use client";

import dynamic from "next/dynamic";

const Launcher = dynamic(() => import("./Launcher"), { ssr: false });

export function AssistantWidgets() {
  return <Launcher />;
}

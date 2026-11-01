"use client";

import { Tab } from "@qeetrix/react/tabs";
import type { ReactNode } from "react";
import { TAB_ICONS, type TabIconId } from "@/config/capability-icons";

/** A capability tab with its icon — client-side, because Tab takes the icon component itself. */
export function CapabilityTab({ value, children }: { value: TabIconId; children: ReactNode }) {
  return (
    <Tab value={value} icon={TAB_ICONS[value]}>
      {children}
    </Tab>
  );
}

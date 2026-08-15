import { cn } from "@qeetrix/ui";
import { CheckIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";

import {
  AVAILABILITY_LABEL,
  type FeatureAvailability,
  type PlanFeatureValue,
  resolveFeatureValue,
} from "@/lib/pricing";

/**
 * Feature-availability rendering, mirroring the existing competitor-comparison
 * visual language (emerald ✓ / amber — / muted ✕) and extending it with add-on
 * and custom states. Meaning is never conveyed by colour or icon alone: every
 * cell carries screen-reader text, and the visible {@link FeatureLegend}
 * explains each state (§9/§18).
 */

type StatusMeta = {
  icon: typeof CheckIcon;
  /** Icon + pill colour classes. */
  className: string;
};

const STATUS_META: Record<Exclude<FeatureAvailability, "custom">, StatusMeta> = {
  included: {
    icon: CheckIcon,
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  limited: {
    icon: MinusIcon,
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  "add-on": {
    icon: PlusIcon,
    className: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  },
  unavailable: {
    icon: XIcon,
    className: "bg-muted text-muted-foreground",
  },
};

const ALL_STATUSES: FeatureAvailability[] = [
  "included",
  "limited",
  "add-on",
  "custom",
  "unavailable",
];

function StatusIcon({ status }: { status: Exclude<FeatureAvailability, "custom"> }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return (
    <span
      className={cn("inline-flex size-6 items-center justify-center rounded-full", meta.className)}
    >
      <Icon className="size-3.5" aria-hidden />
    </span>
  );
}

/**
 * Render a plan's value for one feature: a short qualifier label when present
 * (e.g. "90 days"), otherwise a status icon. The availability word is always
 * announced to screen readers.
 */
export function StatusCell({ value }: { value: PlanFeatureValue }) {
  const { status, label } = resolveFeatureValue(value);
  const word = AVAILABILITY_LABEL[status];

  if (label) {
    return (
      <span
        className={cn(
          "text-sm",
          status === "unavailable" && "text-muted-foreground",
          status === "custom" && "font-medium text-brand-text",
        )}
      >
        {label}
        <span className="sr-only"> — {word}</span>
      </span>
    );
  }

  if (status === "custom") {
    return (
      <span className="text-sm font-medium text-brand-text">
        Custom
        <span className="sr-only"> — {word}</span>
      </span>
    );
  }

  return (
    <>
      <StatusIcon status={status} />
      <span className="sr-only">{word}</span>
    </>
  );
}

/** Small brand chip used for the "custom" entry in the legend. */
function CustomChip() {
  return (
    <span className="inline-flex h-6 items-center rounded-full bg-brand/15 px-2 text-xs font-medium text-brand-text">
      Custom
    </span>
  );
}

/** Legend explaining each availability state (§9). */
export function FeatureLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground", className)}>
      {ALL_STATUSES.map((status) => (
        <li key={status} className="flex items-center gap-1.5">
          {status === "custom" ? (
            <CustomChip />
          ) : (
            <span
              className={cn(
                "inline-flex size-4 items-center justify-center rounded-full",
                STATUS_META[status].className,
              )}
            >
              {(() => {
                const Icon = STATUS_META[status].icon;
                return <Icon className="size-2.5" aria-hidden />;
              })()}
            </span>
          )}
          {AVAILABILITY_LABEL[status]}
        </li>
      ))}
    </ul>
  );
}

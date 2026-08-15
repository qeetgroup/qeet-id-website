"use client";

import type { ComponentProps } from "react";

import { ButtonLink } from "@/components/marketing/button-link";
import { track } from "@/lib/analytics";
import { CONTACT_SALES_HREF } from "@/lib/pricing";

type ContactSalesButtonProps = Omit<ComponentProps<typeof ButtonLink>, "href" | "onClick"> & {
  /** Where on the page the click originated (for analytics). */
  source: string;
};

/**
 * "Talk to sales" CTA that routes to the contact flow and records the
 * `enterprise_contact_click` event. Thin client wrapper so server sections can
 * still be server-rendered around it.
 */
export function ContactSalesButton({ source, children, ...props }: ContactSalesButtonProps) {
  return (
    <ButtonLink
      href={CONTACT_SALES_HREF}
      onClick={() => track("enterprise_contact_click", { source })}
      {...props}
    >
      {children}
    </ButtonLink>
  );
}

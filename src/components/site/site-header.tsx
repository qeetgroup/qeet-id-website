"use client";

import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "@qeetrix/icons";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter } from "@qeetrix/react/drawer";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { SEARCH_OPEN_EVENT } from "@/components/search/search-popup";
import { CAPABILITIES } from "@/config/capability-index";
import { BrandMark } from "./brand-mark";
import { ButtonLink } from "./button-link";
import { DOCS, PRIMARY_NAV, PRODUCT_PANEL } from "./site-nav";
import { ThemeSwitch } from "./theme-switch";

/** Routes whose first section is a dark hero the bar floats over (and every /product/ page). */
const DARK_HERO = new Set(["/", "/features", "/migrate"]);

/**
 * Hover intent for the Product panel (as qeet.in's): opening waits a beat, so
 * sweeping across the bar does not flash it open; closing waits longer, so the
 * gap between the trigger and the panel can be crossed.
 */
function useHoverIntent(onOpen: () => void, onClose: () => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clear, []);
  return {
    enter: () => {
      clear();
      timer.current = setTimeout(onOpen, 90);
    },
    leave: () => {
      clear();
      timer.current = setTimeout(onClose, 180);
    },
  };
}

function useScrollState() {
  const [state, setState] = useState({ scrolled: false, progress: 0 });
  useEffect(() => {
    let raf = 0;
    const read = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const progress = max > 0 ? Math.min(1, scrollY / max) : 0;
        setState((s) =>
          s.scrolled === scrollY > 24 && Math.abs(s.progress - progress) < 0.002
            ? s
            : { scrolled: scrollY > 24, progress },
        );
      });
    };
    read();
    addEventListener("scroll", read, { passive: true });
    addEventListener("resize", read, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", read);
      removeEventListener("resize", read);
    };
  }, []);
  return state;
}

/**
 * The Qeet ID header — qeet.in's bar (`.mh`): the Qeet mark and the product's
 * name, five destinations with the Ember rule on the current one, and the docs
 * as the one solid action (decided 2026-10-29: "Read the docs" until production
 * runs). It floats light-on-dark over the home hero and turns solid once the
 * page scrolls, with a 2px progress line. Product is a disclosure (qeet.in's
 * header panels): its panel follows its button in the keyboard order, opens on
 * click or hover intent, and Escape, a click outside or focus leaving closes
 * it. Below 1080px the destinations move into a Qeetrix Drawer (focus held,
 * Escape closes, focus returns).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled, progress } = useScrollState();
  const [menu, setMenu] = useState({ open: false, at: pathname });
  const open = menu.open && menu.at === pathname;
  const setOpen = (next: boolean) => setMenu({ open: next, at: pathname });
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchAfterClose = useRef(false);

  // The Product panel's open state is kept with the route it was opened on,
  // so moving to another page closes it without an effect.
  const [panel, setPanel] = useState({ open: false, at: pathname });
  const panelOpen = panel.open && panel.at === pathname;
  const setPanelOpen = (next: boolean) => setPanel({ open: next, at: pathname });
  const hover = useHoverIntent(
    () => setPanelOpen(true),
    () => setPanelOpen(false),
  );
  const panelId = useId();
  const bar = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Escape closes the panel and returns focus to its button; a click outside dismisses it.
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        trigger.current?.focus();
        setPanel((p) => ({ ...p, open: false }));
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!bar.current?.parentElement?.contains(e.target as Node))
        setPanel((p) => ({ ...p, open: false }));
    };
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onPointer);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onPointer);
    };
  }, [panelOpen]);

  useEffect(() => {
    if (!open) return;
    const wide = matchMedia("(min-width: 1080px)");
    const onChange = () => wide.matches && setMenu((m) => ({ ...m, open: false }));
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [open]);

  const overlay = DARK_HERO.has(pathname) || pathname.startsWith("/product/");
  const inProduct = pathname === "/features" || pathname.startsWith("/product/");
  const state = scrolled || open || panelOpen ? "solid" : overlay ? "over" : "top";
  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  return (
    <>
      <header
        className="mh"
        data-state={state}
        data-overlay={overlay ? "" : undefined}
        data-qx-color-scheme={state === "over" ? "dark" : undefined}
      >
        <div className="m-wrap mh-row" ref={bar}>
          <NextLink href="/" className="mh-brand" aria-label="Qeet ID home">
            <BrandMark height={26} />
            <span className="mh-brand-name">Qeet ID</span>
          </NextLink>
          <nav aria-label="Primary" className="mh-nav">
            {PRIMARY_NAV.map((item) =>
              "panel" in item ? (
                <div
                  key={item.href}
                  className="mh-dest"
                  onMouseEnter={hover.enter}
                  onMouseLeave={hover.leave}
                  onBlur={(e) => {
                    if (panelOpen && !e.currentTarget.contains(e.relatedTarget as Node | null))
                      setPanelOpen(false);
                  }}
                >
                  <button
                    type="button"
                    ref={trigger}
                    className="mh-link"
                    aria-expanded={panelOpen}
                    aria-controls={panelId}
                    aria-current={inProduct ? "page" : undefined}
                    onClick={() => setPanelOpen(!panelOpen)}
                  >
                    {item.label}
                    <ChevronDownIcon size={14} aria-hidden className="mh-caret" />
                  </button>
                  {panelOpen && (
                    <section id={panelId} aria-label={`${item.label} menu`} className="mp">
                      <div className="m-wrap mp-zones">
                        <div className="mp-intro">
                          <p className="m-geo mp-statement">{PRODUCT_PANEL.statement}</p>
                          {[PRODUCT_PANEL.all, PRODUCT_PANEL.migrate].map((l) => (
                            <NextLink key={l.href} href={l.href} className="mp-all">
                              {l.label}
                              <ArrowRightIcon size={16} aria-hidden />
                            </NextLink>
                          ))}
                        </div>
                        <ul className="mp-caps">
                          {CAPABILITIES.map(({ slug, name, line, icon: Icon }) => (
                            <li key={slug}>
                              <NextLink
                                href={`/product/${slug}`}
                                className="mp-item"
                                aria-current={current(`/product/${slug}`)}
                              >
                                <span className="ih-icon">
                                  <Icon size={20} aria-hidden />
                                </span>
                                <span>
                                  <span className="mp-item-name">{name}</span>
                                  <span className="mp-item-line">{line}</span>
                                </span>
                              </NextLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  )}
                </div>
              ) : (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="mh-link"
                  aria-current={current(item.href)}
                  onMouseEnter={panelOpen ? hover.leave : undefined}
                >
                  {item.label}
                </NextLink>
              ),
            )}
          </nav>
          <div className="mh-end">
            <button
              type="button"
              className="mh-icon"
              aria-label="Search Qeet ID"
              title="Search"
              onMouseEnter={panelOpen ? hover.leave : undefined}
              onClick={() => dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
            >
              <SearchIcon size={20} aria-hidden />
            </button>
            <span className="mh-cta">
              <ButtonLink size="sm" href={DOCS.href} icon={ArrowUpRightIcon}>
                {DOCS.label}
              </ButtonLink>
            </span>
            <button
              type="button"
              ref={menuButton}
              className="mh-icon mh-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
            >
              {open ? <XIcon size={22} aria-hidden /> : <MenuIcon size={22} aria-hidden />}
            </button>
          </div>
        </div>
        <span className="mh-progress" aria-hidden="true" style={{ ["--p" as string]: progress }} />
      </header>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={(isOpen) => {
          // Search opens once the drawer has closed and handed focus back, so
          // the drawer's focus return cannot take focus from the search field.
          if (!isOpen && searchAfterClose.current) {
            searchAfterClose.current = false;
            dispatchEvent(new Event(SEARCH_OPEN_EVENT));
          }
        }}
      >
        <DrawerContent
          id="mobile-nav"
          title="Menu"
          size="sm"
          className="pm"
          finalFocus={menuButton}
        >
          <DrawerBody className="pm-body">
            <button
              type="button"
              className="pm-search"
              onClick={() => {
                searchAfterClose.current = true;
                setOpen(false);
              }}
            >
              <SearchIcon size={18} aria-hidden />
              Search Qeet ID
            </button>
            <nav aria-label="Primary" className="pm-sections">
              <p className="m-caps pm-head">Product</p>
              <ul className="pm-caps">
                {CAPABILITIES.map(({ slug, name, icon: Icon }) => (
                  <li key={slug}>
                    <NextLink
                      href={`/product/${slug}`}
                      className="pm-cap"
                      aria-current={current(`/product/${slug}`)}
                    >
                      <Icon size={20} aria-hidden />
                      {name}
                    </NextLink>
                  </li>
                ))}
              </ul>
              {PRIMARY_NAV.map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="pm-link"
                  aria-current={current(item.href)}
                >
                  {"panel" in item ? PRODUCT_PANEL.all.label : item.label}
                  <ArrowRightIcon size={18} aria-hidden />
                </NextLink>
              ))}
            </nav>
          </DrawerBody>
          <DrawerFooter className="pm-foot">
            <ButtonLink href={DOCS.href} icon={ArrowUpRightIcon}>
              {DOCS.label}
            </ButtonLink>
            <ThemeSwitch />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

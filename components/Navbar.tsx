"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Games", href: "/#games" },
  { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${
        scrolled || mobileOpen
          ? "border-oc-blue/30 bg-overclock-black/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <BrandLogo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-oc-text transition-colors duration-200 hover:text-oc-white hover:[text-shadow:0_0_10px_rgba(0,140,255,0.7)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link href="/booking" className="oc-btn oc-btn--primary">
            Book a Slot
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-oc-blue/40 text-oc-white transition-colors hover:border-oc-blue lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-oc-blue/20 bg-overclock-black/95 backdrop-blur-md lg:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-oc-blue/10 py-4 font-heading text-base font-semibold uppercase tracking-[0.18em] text-oc-text transition-colors hover:text-oc-white hover:[text-shadow:0_0_10px_rgba(0,140,255,0.7)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="oc-btn oc-btn--primary w-full"
              >
                Book a Slot
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
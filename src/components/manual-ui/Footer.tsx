"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Jobs", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Community: [
    { label: "Writers", href: "/writers" },
    { label: "Brand Partnerships", href: "/partnerships" },
  ],
  Support: [
    { label: "Help", href: "/help" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  Legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Payment Policy", href: "/payment-policy" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t
    bg-[url('/footer-wave.svg')] 
    bg-no-repeat bg-cover bg-position-[center_-83px]
  "
  >
      <div className="w-full max-w-7xl mx-auto py-10 px-4 text-white ">
        {/* Top row: brand + app badge */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-xl font-bold">
            Blog Hub
          </Link>

          <div className="flex items-center gap-3 text-black dark:text-white">
            <Link
              href="/premium"
              className="text-sm font-medium hover:underline"
            >
              Try Premium
            </Link>
            <span className="hidden md:inline-block text-sm text-muted-foreground">
              Get the app
            </span>
            <Button size="sm" variant="outline" asChild>
              <Link href="/download">Get the App</Link>
            </Button>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-semibold">{group}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© 2025 Blog Hub</p>
          <div className="flex items-center gap-4">
            <Link href="/language" className="hover:underline">
              Language
            </Link>
            <span aria-hidden>·</span>
            <Link href="/writers" className="hover:underline">
              Writers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

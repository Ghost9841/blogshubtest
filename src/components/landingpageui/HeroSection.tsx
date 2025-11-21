"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <main className="min-h-screen flex items-start justify-center pt-16">
      <div className="container max-w-7xl w-full  px-4 grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Copy */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Blog smarter.
            <br />
            Create faster.
            <br />
            Grow Bigger.
          </h1>
          <p className="text-xl text-muted-foreground">
            A clean modern platform built for writers,
            <br/> thinkers and story tellers.
          </p>

          <div className="space-y-3">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Placeholder visual (optional) */}
        <div className="hidden md:flex items-center justify-center">
          <div className="w-full h-80 rounded-xl bg-linear-to-br from-primary/20 to-primary/10" />
        </div>
      </div>
    </main>
  );
}
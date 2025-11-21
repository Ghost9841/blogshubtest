"use client";

import Link from "next/link";
import { Search, ChevronDown, FilePlusCorner } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../sun-moon";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
<div className="w-full max-w-8xl mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo / Brand */}
        <div className="flex flex-row gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">BlogHub</span>
        </Link>

        <div className="hidden w-full max-w-sm md:flex">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              />
          </div>
        </div>
              </div>


        {/* Right: Actions */}
        <div className="flex items-center space-x-2">
          {/* Write Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="space-x-1">
                <span>Write</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/my-posts">
                <FilePlusCorner className=" h-4 w-4" />My Posts</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            <ModeToggle/>
          {/* Login & Sign-up */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
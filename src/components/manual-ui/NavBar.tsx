"use client";

import Link from "next/link";
import { Search, ChevronDown, FilePlusCorner, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../sun-moon";
import { useAuthStore } from "@/store/authStore";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q") as string;
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-full max-w-8xl mx-auto flex h-16 items-center justify-between px-4">


        <div className="flex flex-row gap-10">
          <Link href="/" className="flex items-center space-x-2">
           <span
                className="
                  flex h-10 w-10 items-center justify-center rounded-lg 
                  bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black
                  font-bold text-lg
                "
              >
                B
              </span>
            <span className="text-xl font-bold">BlogHub</span>
          </Link>

          <Link href="/allblogs" className="flex items-center space-x-2">
            <span>Browse</span>
          </Link>

             <form onSubmit={handleSearch} className="relative hidden w-full max-w-sm md:flex">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input name="q" placeholder="Search blogs & users…" className="pl-8" />
    </form>
        </div>

        <div className="flex items-center space-x-3">


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="space-x-1">
                <span>Write</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild className="text-lg font-bold hover:underline">
                  <Link href="/createblog" >
                    <FilePlusCorner className="h-8! w-8! font-bold" /> New Blog
                  </Link>
                </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:underline">
                <Link href="/myblogs">
                  My Blogs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          {!user && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.avatar} className="h-4 w-4"></AvatarImage>
                  </Avatar>
                  {user.name}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem asChild className="text-xl hover:underline">
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 focus:text-red-600  hover:underline"
                >
                  <LogOut className="mr-2 h-4 w-4 text-red-500" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

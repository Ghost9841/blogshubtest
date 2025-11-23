// app/search/page.tsx  (pages router → pages/search.tsx)
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import {  User, FileText, Heart, Eye } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePosts } from "@/hooks/usePosts";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const { posts } = usePosts();
  const { users } = useUsers();

  /* filter logic */
  const matchedBlogs = posts.filter(
    (p) =>
      p.status && // ← only published
      p.title.toLowerCase().includes(query) ||
      p.content.toLowerCase().includes(query) 
  );

  const matchedUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(query) ||
      u.email?.toLowerCase().includes(query)
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">
        Search results for <span className="text-blue-600">“{query}”</span>
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* LEFT → blogs */}
        <section className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{matchedBlogs.length} blogs found</span>
          </div>

          {matchedBlogs.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">No blogs matched.</CardContent>
            </Card>
          ) : (
            matchedBlogs.map((post) => <BlogRow key={post.id} post={post} />)
          )}
        </section>

        <Separator orientation="vertical" className="hidden md:block" />

        {/* RIGHT → users */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{matchedUsers.length} users found</span>
          </div>

          {matchedUsers.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">No users matched.</CardContent>
            </Card>
          ) : (
            matchedUsers.map((user) => <UserRow key={user.id} user={user} />)
          )}
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------- */
/*  compact blog row (smaller than All-Blogs card)   */
/* -------------------------------------------------- */
function BlogRow({ post }: { post: any }) {
  const cover = post.coverImage || `https://source.unsplash.com/random/200x120?blog,${post.id}`;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex gap-4">
        <Link href={`/allblogs/${post.id}`} className="shrink-0">
          <Image
            src={cover}
            alt={post.title}
            width={90}
            height={60}
            className="rounded-md object-cover"
          />
        </Link>

        <div className="flex-1 space-y-1">
          <Link href={`/allblogs/${post.id}`}>
            <h3 className="font-semibold line-clamp-2 hover:underline">{post.title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {stripHtml(post.content)}
          </p>

          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {post.reads || 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> {post.likes || 0}
            </span>
            <span className="ml-auto">
              {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------- */
/*  compact user row                                  */
/* -------------------------------------------------- */
function UserRow({ user }: { user: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar>
          <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        <Link href={`/user/${user.id}`}>
          <Button size="sm" variant="outline">View</Button>
        </Link>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------- */
/*  helper                                            */
/* -------------------------------------------------- */
function stripHtml(html = ""): string {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  } catch {
    return html;
  }
}
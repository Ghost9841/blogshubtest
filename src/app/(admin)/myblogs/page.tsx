"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Eye,
  Heart,
  Search,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { usePosts } from "@/hooks/usePosts";
import { StatCard, PostGridSkeleton, EmptyState, PostCard } from "./PostCardComps";
import { PostReaderSheet } from "./ReadingSheet";

export default function MyBlogsPage() {
  const { posts, fetchPosts, removePost, loading } = usePosts();
  const [query, setQuery] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activePost, setActivePost] = useState<any>(null);

  useEffect(() => {
    fetchPosts(1, 50);
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const openPost = (post: any) => {
    setActivePost(post);
    setSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Blogs</h1>
            <p className="text-sm text-muted-foreground">
              Manage your stories and track performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Link href="/createblog">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Blogs Published"
            value={posts.length}
            icon={FileText}
          />
          <StatCard
            label="Total Likes"
            value={posts.reduce((sum, p) => sum + (p.likes || 0), 0)}
            icon={Heart}
          />
        </div>

        <Separator />

        {/* Posts */}
        {loading && <PostGridSkeleton />}
        {!loading && filtered.length === 0 && (
          <EmptyState query={query} />
        )}
        {!loading && filtered.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={() => removePost(post.id)}
                onRead={() => openPost(post)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reader Sheet */}
      <PostReaderSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        activePost={activePost}
      />
    </div>
  );
}
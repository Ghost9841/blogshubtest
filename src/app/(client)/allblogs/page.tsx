"use client";

import usePosts from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart } from "lucide-react";
import { EmptyState, PostGridSkeleton, stripHtml } from "./AllBlogsPageComp";

const PAGE_SIZE = 100;

export default function AllBlogsPage() {
  const { posts, fetchPosts, loading, error } = usePosts();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /* first load */
  useEffect(() => {
    (async () => {
      const first = await fetchPosts(1, PAGE_SIZE);
      if (first.length < PAGE_SIZE) setHasMore(false);
      setPage(2);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* pagination */
  const loadMore = async () => {
    const next = await fetchPosts(page, PAGE_SIZE);
    if (next.length < PAGE_SIZE) setHasMore(false);
    setPage((p) => p + 1);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">All Blogs</h1>
        <p className="text-muted-foreground">Discover amazing stories and insights</p>
      </header>

      {error && (
        <div className="text-center text-destructive text-sm">{error}</div>
      )}

      {/* grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts
        .filter((post) => post.status)
        .map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* skeleton while first page loads */}
        {loading && posts.length === 0 && <PostGridSkeleton />}
      </div>

      {/* load more / end */}
      <div className="flex justify-center">
        {hasMore && (
          <Button onClick={loadMore} disabled={loading} size="sm">
            {loading ? "Loading…" : "Load more"}
          </Button>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-sm text-muted-foreground">You’ve reached the end 🎉</p>
        )}
      </div>

      {!loading && posts.length === 0 && <EmptyState />}
    </main>
  );
}

export function PostCard({ post }: { post: any }) {
  const cover = post.coverImage || `https://source.unsplash.com/random/400x250?blog ,${post.id}`;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/allblogs/${post.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={cover}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant={post.status ? "default" : "secondary"}>
            {post.status ? "Published" : "Draft"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <Link href={`/allblogs/${post.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:underline">{post.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
          {stripHtml(post.content)}
        </p>
      </CardContent>

      <CardFooter className="justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {post.reads || 0}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-3 w-3" />
          {post.likes || 0}
        </span>
        <span>{post.authorName?.slice(0, 10) || "Anon"}</span>
      </CardFooter>
    </Card>
  );
}

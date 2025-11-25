"use client";

import usePosts from "@/hooks/usePosts";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";
import { FileText, Search, Edit3, Trash2, Upload } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 10;

export default function DraftPage() {
  const { posts, fetchPosts, loading, error, removePost, editPost } = usePosts();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /* first load → grab enough drafts */
  useEffect(() => {
    (async () => {
      const first = await fetchPosts(1, 50); // 50 is plenty for drafts
      const drafts = first.filter((p) => !p.status);
      setHasMore(drafts.length === PAGE_SIZE);
      setPage(2);
    })();
  }, []);

  /* filter drafts + search */
  const drafts = useMemo(
    () => posts.filter((p) => !p.status),
    [posts]
  );

  const filtered = useMemo(
    () =>
      drafts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.content.toLowerCase().includes(query.toLowerCase())
      ),
    [drafts, query]
  );

  /* publish helper → flip status */
  const publishDraft = async (id: string) => {
    await editPost(id, { status: true });
  };

  /* pagination (client side) */
  const shown = filtered.slice(0, page * PAGE_SIZE);
  const loadMore = () => setPage((p) => p + 1);

  if (error)
    return (
      <div className="max-w-5xl mx-auto p-6 text-destructive">{error}</div>
    );

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-8">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Drafts</h1>
        <Badge variant="secondary">{drafts.length} drafts</Badge>
      </div>

      {/* search bar */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search drafts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* list */}
      {loading && drafts.length === 0 ? (
        <DraftGridSkeleton />
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            {query ? "No drafts match your search." : "You have no drafts yet."}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {shown.map((post) => (
              <DraftCard
                key={post.id}
                post={post}
                onPublish={() => publishDraft(post.id)}
                onDelete={() => removePost(post.id)}
              />
            ))}
          </div>

          {shown.length < filtered.length && (
            <div className="flex justify-center">
              <Button onClick={loadMore} disabled={loading} size="sm">
                Load more
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

/* -------------------------------------------------- */
/*  single draft card                                 */
/* -------------------------------------------------- */
function DraftCard({
  post,
  onPublish,
  onDelete,
}: {
  post: any;
  onPublish: () => void;
  onDelete: () => void;
}) {
  const cover = post.coverImage || `https://source.unsplash.com/random/300x180?draft,${post.id}`;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        {/* thumbnail + title row */}
        <div className="flex gap-3">
          <Link href={`/editblog/${post.id}`} className="shrink-0">
            <Image
              src={cover}
              alt={post.title}
              width={96}
              height={64}
              className="rounded-md object-cover"
            />
          </Link>
          <div className="flex-1">
            <Link href={`/editblog/${post.id}`}>
              <h3 className="font-semibold line-clamp-2 hover:underline">{post.title}</h3>
            </Link>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {stripHtml(post.content)}
            </p>
          </div>
        </div>

        {/* meta + actions */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onPublish}>
              <Upload className="h-3 w-3 mr-1" /> Publish
            </Button>
            <Link href={`/editblog/${post.id}`}>
              <Button size="sm" variant="ghost">
                <Edit3 className="h-3 w-3" />
              </Button>
            </Link>
            <Button size="sm" variant="ghost" onClick={onDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* skeleton while first load */
function DraftGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-4 space-y-3">
          <div className="flex gap-3">
            <Skeleton className="h-16 w-24 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </Card>
      ))}
    </div>
  );
}

/* helper */
function stripHtml(html = ""): string {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  } catch {
    return html;
  }
}
// app/allblogs/[id]/page.tsx  (pages router → pages/allblogs/[id].tsx)
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDistance } from "date-fns";
import { Heart, Share2, MessageCircle, Copy, ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { copyLink } from "@/lib/copy";
import { usePosts } from "@/hooks/usePosts";

export default function ViewPostPage() {
  const { id } = useParams();
  const { fetchPostById } = usePosts();

  const [post, setPost] = useState<any>(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    fetchPostById(id as string).then(setPost);
  }, [id]);

  if (!post) return <Skeleton />;

  const cover = post.coverImage || `https://source.unsplash.com/random/1600x900?blog=${post.id}`;

  return (
    <>
      {/* sticky top bar */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/allblogs" className="flex items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> All Blogs
          </Link>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => setLikes((l) => l + 1)}>
              <Heart className="h-4 w-4 mr-1" /> {post.likes + likes}
            </Button>
            <Button size="sm" variant="ghost" onClick={copyLink}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* cover parallax */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={cover}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent" />
      </div>

      {/* article body */}
      <article className="max-w-3xl mx-auto px-4 pb-20 -mt-20 relative z-20">
        {/* meta card */}
        <div className="bg-card rounded-xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{post.authorName?.[0] || "A"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
                {post.updatedAt !== post.createdAt && " · edited"}
              </p>
            </div>
          </div>

          <Badge variant={post.status ? "default" : "secondary"}>
            {post.status ? "Published" : "Draft"}
          </Badge>

          <h1 className="text-4xl font-extrabold leading-tight">{post.title}</h1>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t: string) => (
                <Badge key={t} variant="outline">#{t}</Badge>
              ))}
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {/* rich content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
                     prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                     prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic
                     prose-code:px-1 prose-code:py-0.5 prose-code:bg-muted prose-code:rounded
                     prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <Separator className="my-10" />

        {/* floating action bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur border-t p-3 flex items-center justify-between max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" onClick={() => setLikes((l) => l + 1)}>
            <Heart className="h-4 w-4 mr-2" />
            {post.likes + likes} likes
          </Button>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline"><MessageCircle className="h-4 w-4 mr-2" />Comment</Button>
            <Button size="sm" variant="outline" onClick={copyLink}><Copy className="h-4 w-4 mr-2" />Share</Button>
          </div>
        </div>
      </article>
    </>
  );
}

/* skeleton while loading */
function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="h-64 bg-muted rounded-xl" />
      <div className="h-8 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { usePosts } from "@/hooks/usePosts";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyBlogsPage() {
  const { posts, fetchPosts, removePost, loading } = usePosts();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search posts..."
          className="w-64"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link href="/createblog">
          <Button>Create Post</Button>
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid gap-4">
        {filtered.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-lg font-bold">{post.title}</h2>

            <div className="flex gap-3 mt-3">
              <Link href={`/posts/${post.id}/edit`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removePost(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

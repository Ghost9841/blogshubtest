"use client";

import { usePosts } from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { posts, fetchPosts, editPost } = usePosts();

  const existing = posts.find((p) => p.id === id);

  const [title, setTitle] = useState(existing?.title || "");
  const [content, setContent] = useState(existing?.content || "");

  useEffect(() => {
    if (!existing) fetchPosts();
  }, []);

  const save = async () => {
    await editPost(id as string, { title, content });
    router.push("/myblogs");
  };

  if (!existing) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-xl font-bold mb-4">Edit Post</h1>

      <Input
        defaultValue={existing.title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
      />

      <Textarea
        rows={12}
        defaultValue={existing.content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button className="mt-4" onClick={save}>
        Save Changes
      </Button>
    </div>
  );
}

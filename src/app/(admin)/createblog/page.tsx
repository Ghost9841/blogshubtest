"use client";

import { usePosts } from "@/hooks/usePosts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const { createPost } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await createPost({
      title,
      content,
      authorId: "1", // from auth store
    });
    router.push("/myblogs");
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>

      <Input
        placeholder="Blog title"
        className="mb-3"
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        placeholder="Content..."
        rows={10}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button className="mt-4" onClick={submit}>
        Publish
      </Button>
    </div>
  );
}

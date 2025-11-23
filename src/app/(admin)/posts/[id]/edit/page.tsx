// app/editblog/[id]/page.tsx  (pages router → pages/editblog/[id].tsx)
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import RichEditor from "@/components/manual-ui/RichEditor";
import { usePosts } from "@/hooks/usePosts";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const { posts, fetchPosts, editPost } = usePosts();

  const existing = posts.find((p) => p.id === id);

  /* states */
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [status, setStatus] = useState<boolean>(false);

  /* hydrate when post arrives */
  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setContent(existing.content);
      setAuthorName(existing.authorName || "");
      setStatus(existing.status);
    } else {
      fetchPosts(); // load once if deep-linked
    }
  }, [existing]);

  const save = async () => {
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      return alert("Please fill title, content and author name");
    }
    await editPost(id as string, { title, content, authorName, status });
    router.push(status ? "/allblogs" : "/myblogs");
  };

  if (!existing && posts.length === 0) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Story</h1>

      {/* meta row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Story title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Author name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
      </div>

      {/* status toggle */}
      <div className="flex items-center gap-3">
        <Switch id="status" checked={status} onCheckedChange={setStatus} />
        <Label htmlFor="status">{status ? "Published" : "Draft"}</Label>
      </div>

      {/* Write / Preview tabs */}
      <Tabs defaultValue="write">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <RichEditor value={content} onChange={setContent} />
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="pt-4">
              <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button onClick={save}>Save Changes</Button>
      </div>
    </div>
  );
}
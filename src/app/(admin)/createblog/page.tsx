"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import RichEditor from "@/components/manual-ui/RichEditor";
import { usePosts } from "@/hooks/usePosts";

export default function CreateBlogPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");

  const submit = async (s: boolean) => {
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      return alert("Please fill title, content and author name");
    }
    await createPost({ title, content, authorName, status: s, tags: [] });
    router.push(s ? "/allblogs" : "/myblogs"); // published → public feed, draft → my list
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create Story</h1>

      {/* meta row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Story title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Your name (author)" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
      </div>

      {/* write / preview tabs */}
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
        <Button variant="outline" onClick={() => submit(false)} disabled={!content || !title || !authorName}>
          Save as Draft
        </Button>
        <Button onClick={() => submit(true)} disabled={!content || !title || !authorName}>
          Publish
        </Button>
      </div>
    </div>
  );
}
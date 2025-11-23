"use client";

import { useEffect } from "react";
import usePosts from "@/hooks/usePosts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loading from "@/components/manual-ui/Loading";

export default function DashboardPage() {
  const { posts, fetchPosts, loading, error } = usePosts();

  useEffect(() => {
    fetchPosts(); 
  }, []);

  if (loading) return <div className="min-h-full flex items-center justify-center"><Loading/></div>;
  if (error) return <div>{error}</div>;

  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === true).length;
  const draftPosts = posts.filter((p) => p.status === false).length;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* TOTAL POSTS */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{totalPosts}</span>
        </CardContent>
      </Card>

      {/* PUBLISHED */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Published</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{publishedPosts}</span>
        </CardContent>
      </Card>

      {/* DRAFTS */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Drafts</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-4xl font-bold">{draftPosts}</span>
        </CardContent>
      </Card>
    </div>
  );
}

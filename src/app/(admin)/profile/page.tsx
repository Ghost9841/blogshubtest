// app/profile/page.tsx
"use client";

import Link from "next/link";
import { Calendar, Mail, FileText, Settings, LogOut } from "lucide-react";
import { formatDistance } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { usePosts } from "@/hooks/usePosts";
import { useEffect } from "react";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { posts, fetchPosts } = usePosts();

  const myPosts = posts.filter((p) => p.authorName === user?.name);
  const joinDate = user?.createdAt
    ? formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })
    : "Unknown";

  useEffect(() => {
    fetchPosts(); // load once to count posts
  }, []);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <p className="mb-4">You are not logged in.</p>
        <Link href="/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* top bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="flex gap-2">
          <Link href="/settings">
            <Button variant="outline" size="sm" className="hover:underline">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={logout} className="hover:underline text-red-500 hover:text-red-600 focus:text-red-600">
            <LogOut className="h-4 w-4 mr-2 text-red-500" /> Logout
          </Button>
        </div>
      </div>

      {/* avatar + info card */}
      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" /> {user.email}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Joined {joinDate}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" /> My Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{myPosts.length}</p>
          <p className="text-sm text-muted-foreground">Published stories</p>
        </CardContent>
      </Card>

      {/* recent posts preview */}
      {myPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {myPosts.slice(0, 3).map((p) => (
              <Link key={p.id} href={`/allblogs/${p.id}`}>
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistance(new Date(p.createdAt), new Date(), { addSuffix: true })}
                  </span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
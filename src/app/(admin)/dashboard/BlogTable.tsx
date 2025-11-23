// components/LatestPostsTable.tsx
"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { Edit, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Post { id: string; title: string; status: boolean; createdAt: string; }

export default function LatestPostsTable({ posts }: { posts: Post[] }) {
  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Latest posts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium line-clamp-1">{p.title}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={p.status ? "default" : "secondary"}>{p.status ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {formatDistance(new Date(p.createdAt), new Date(), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/posts/${p.id}/edit`}>
                      <Button size="sm" variant="outline"><Edit className="h-4 w-4" /></Button>
                    </Link>
                    <Link href={`/allblogs/${p.id}`} target="_blank">
                      <Button size="sm" variant="outline"><ExternalLink className="h-4 w-4" /></Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
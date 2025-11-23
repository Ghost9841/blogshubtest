import { formatDistance } from "date-fns";
import {  MoreHorizontal,
  Trash2,
  Edit3,
  ExternalLink,
  FileText,
  Plus,
  Eye,
  Heart,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}

export function PostCard({
  post,
  onDelete,
  onRead,
}: {
  post: any;
  onDelete: () => void;
  onRead: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-start justify-between gap-2">
          <Badge variant={post.status ? "default" : "secondary"}>
            {post.status ? "Published" : "Draft"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/posts/${post.id}/edit`} className="flex items-center gap-2">
                  <Edit3 className="h-3 w-3" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive flex items-center gap-2">
                <Trash2 className="h-3 w-3" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRead} className="flex items-center gap-2">
                <ExternalLink className="h-3 w-3" /> Read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            className="w-full h-32 object-cover rounded-md mt-3"
          />
        )}

        <h3 className="font-semibold mt-3 line-clamp-2">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
          {stripHtml(post.content)}
        </p>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
        <span className="flex items-center gap-1">
          <Eye className="h-3 w-3" /> {post.reads || 0}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="h-3 w-3" /> {post.likes || 0}
        </span>
        <span className="ml-auto">
          {formatDistance(new Date(post.createdAt), new Date(), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}

export function PostGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ query }: { query: string }) {
  return (
    <div className="text-center py-16">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
      <p className="mt-4 text-lg font-medium">
        {query ? `No posts match “${query}”` : "No blogs published yet"}
      </p>
      <p className="text-sm text-muted-foreground">
        Start writing to see your stories here.
      </p>
      <Link href="/createblog">
        <Button className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Create your first post
        </Button>
      </Link>
    </div>
  );
}


function stripHtml(html: string = ""): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
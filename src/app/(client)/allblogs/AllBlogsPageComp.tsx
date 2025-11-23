
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostGridSkeleton(PAGE_SIZE: any) {
  return (
    <>
      {[...Array(PAGE_SIZE)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}


export function EmptyState() {
  return (
    <div className="text-center py-16 text-muted-foreground">
      <p className="text-lg font-medium">No posts yet.</p>
      <p className="text-sm">Be the first to share a story!</p>
    </div>
  );
}

export function stripHtml(html = ""): string {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  } catch {
    return html;
  }
}
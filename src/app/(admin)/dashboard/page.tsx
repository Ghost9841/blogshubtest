// app/dashboard/page.tsx  (or pages/dashboard.tsx)
"use client";
import { useEffect } from "react";
import usePosts from "@/hooks/usePosts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Upload, FilePen } from "lucide-react";
import Loading from "@/components/manual-ui/Loading";
import PostsChart from "@/app/(admin)/dashboard/BlogCharts";
import LatestPostsTable from "@/app/(admin)/dashboard/BlogTable";
import { last7Days } from "@/lib/date";

export default function DashboardPage() {
  const { posts, fetchPosts, loading, error } = usePosts();

  useEffect(() => { fetchPosts(); }, []);

  if (loading) return <div className="min-h-full flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="p-6 text-destructive">{error}</div>;

  const total = posts.length;
  const published = posts.filter((p) => p.status).length;
  const drafts = posts.filter((p) => !p.status).length;

  // chart data → last 7 days
  const days = last7Days();
  const chartData = days.map((date) => ({
    date,
    count: posts.filter((p) => p.createdAt.slice(0, 10) === date).length,
  }));

  // latest 5
  const latest = posts.slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={total} icon={FileText} />
        <StatCard title="Published" value={published} icon={Upload} />
        <StatCard title="Drafts" value={drafts} icon={FilePen} />
      </div>

      {/* chart + table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PostsChart data={chartData} />
        <LatestPostsTable posts={latest} />
      </div>
    </div>
  );
}

/* reusable stat card with icon & colour */
function StatCard({ title, value, icon: Icon }: { title: string; value: number; icon: React.ElementType }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
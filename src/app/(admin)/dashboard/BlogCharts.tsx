// components/PostsChart.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DayDatum { date: string; count: number; }

export default function PostsChart({ data }: { data: DayDatum[] }) {
  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Posts published (last 7 days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString(undefined, { weekday: 'short' })} />
            <YAxis allowDecimals={false} />
            <Tooltip labelFormatter={(d) => new Date(d).toLocaleDateString()} />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
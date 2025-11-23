"use client";

import usePosts from "@/hooks/usePosts";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AllBlogsPage() {
  const { posts, fetchPosts, loading, error } = usePosts();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // blogs per page

  useEffect(() => {
    fetchPosts(currentPage, pageSize);
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  // Pagination logic
  const totalPages = Math.ceil(posts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedPosts = posts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">

      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>

      {/* Blog List */}
      <div className="space-y-10">
        {paginatedPosts.map((post) => (
          <div
            key={post.id}
            className="flex items-start justify-between gap-4 border-b pb-6"
          >
            {/* Left Section */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium">
                  {post.authorId?.slice(0, 6) || "Unknown"}
                </span>
                <span>•</span>
                <span>{new Date(post.createdAt).toDateString()}</span>
              </div>

              <h2 className="text-xl font-semibold mt-1">{post.title}</h2>

              <p className="text-gray-600 mt-1 line-clamp-2">
                {post.content}
              </p>

              {/* Tags + Likes */}
              <div className="flex items-center gap-4 mt-3">

                <span className="px-2 py-1 rounded-md bg-gray-100 text-sm">
                  {post.status ? "Published" : "Draft"}
                </span>

                <span className="text-sm text-gray-700 flex items-center gap-1">
                  ❤️ {post.likes || 0}
                </span>

                {post.tags?.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-200 rounded-md text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Image */}
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                width={120}
                height={90}
                className="rounded-md object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
}

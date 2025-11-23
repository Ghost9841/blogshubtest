"use client";

import usePosts from "@/hooks/usePosts";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AllBlogsPage() {
  const { posts, fetchPosts, loading, error } = usePosts();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 6;

  useEffect(() => {
    loadMorePosts();
  }, []);

  const loadMorePosts = async () => {
    const newPosts = await fetchPosts(page, pageSize);
    
    if (newPosts && newPosts.length < pageSize) {
      setHasMore(false);
    }
    
    setPage((p) => p + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">All Blogs</h1>
        <p className="text-gray-600">Discover amazing stories and insights</p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col md:flex-row items-start gap-6 p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
          >
            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium">
                  {post.authorName?.slice(0, 6) || "Unknown"}
                </span>
                <span>•</span>
                <span>{new Date(post.createdAt).toDateString()}</span>
              </div>

              <Link href={`/allblogs/${post.id}`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 line-clamp-3 leading-relaxed">
                {post.content}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  post.status 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {post.status ? "Published" : "Draft"}
                </span>
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  ❤️ {post.likes || 0}
                </span>

                {post.tags?.length > 0 && (
                  <div className="flex gap-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 text-gray-500 text-xs">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Image */}
            {post.coverImage && (
              <Link href={`/allblogs/${post.id}`} className="shrink-0">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={120}
                  height={90}
                  className="rounded-lg object-cover hover:scale-105 transition-transform"
                />
              </Link>
            )}
          </article>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Loading..." : "Load More Posts"}
          </button>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center text-gray-500 py-8">
          You've reached the end! 🎉
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No posts found.</p>
          <p className="text-sm">Be the first to create a post!</p>
        </div>
      )}
    </div>
  );
}
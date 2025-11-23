"use client";

import usePosts from "@/hooks/usePosts";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  likes: number;
  tags: string[];
  coverImage?: string;
}

export default function ViewPostPage() {
  const params = useParams();
  const postId = params.id as string;
  
  const { fetchPostById, loading, error } = usePosts();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    const postData = await fetchPostById(postId);
    setPost(postData);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">
          {error || "The post you're looking for doesn't exist."}
        </p>
        <Link 
          href="/allblogs" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to All Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Back Button */}
      <nav>
        <Link 
          href="/allblogs" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          ← Back to All Blogs
        </Link>
      </nav>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">
            {post.authorName?.slice(0, 8) || "Unknown Author"}
          </span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          {post.updatedAt !== post.createdAt && (
            <>
              <span>•</span>
              <span className="text-gray-400">
                Updated {new Date(post.updatedAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            post.status 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {post.status ? "Published" : "Draft"}
          </span>
          <span className="flex items-center gap-1 text-gray-700">
            ❤️ {post.likes || 0} likes
          </span>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed text-gray-700 text-lg">
          {post.content}
        </div>
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <footer className="flex flex-wrap gap-2 pt-8 border-t">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </footer>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-6 border-t">
        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
          ❤️ Like ({post.likes || 0})
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          💬 Comment
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          🔗 Share
        </button>
      </div>
    </article>
  );
}
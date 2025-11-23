"use client";

import { api } from "@/lib/axios";
import { usePostStore } from "@/store/postStore";
import { useState } from "react";

export function usePosts() {
  const { posts, setPosts, addPost, updatePost, deletePost } = usePostStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH ALL POSTS
  const fetchPosts = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
    const { data } = await api.get(`/posts`, {
      params: { page, limit }
    });
    setPosts(data);
    } catch (e: any) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // CREATE POST
  const createPost = async (payload: any) => {
    try {
      setLoading(true);
      const { data } = await api.post("/posts", {
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      addPost(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
  const editPost = async (id: string, payload: any) => {
    const { data } = await api.put(`/posts/${id}`, {
      ...payload,
      updatedAt: new Date().toISOString(),
    });
    updatePost(data);
    return data;
  };

  // DELETE
  const removePost = async (id: string) => {
    await api.delete(`/posts/${id}`);
    deletePost(id);
  };

  return {
    posts,
    fetchPosts,
    createPost,
    editPost,
    removePost,
    loading,
    error,
  };
}

export default usePosts;
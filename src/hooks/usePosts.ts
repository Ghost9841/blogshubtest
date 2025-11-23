"use client";

import { api } from "@/lib/axios";
import { usePostStore } from "@/store/postStore";
import { useState } from "react";

export function usePosts() {
  const { posts, setPosts, addPost, updatePost, deletePost } = usePostStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH ALL POSTS (Paginated)
  const fetchPosts = async (page = 1, limit = 100) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get(`/posts`, {
        params: { page: page, limit: limit }
      });
      
      // If it's the first page, replace posts, otherwise append
      if (page === 1) {
        setPosts(data);
      } else {
        // Append new posts to existing ones
        setPosts([...posts, ...data]);
      }
      
      return data;
    } catch (e: any) {
      setError("Failed to fetch posts");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // FETCH SINGLE POST BY ID
  const fetchPostById = async (id: string) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get(`/posts/${id}`);
      return data;
    } catch (e: any) {
      setError("Post not found");
      return null;
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
    } catch (e: any) {
      setError("Failed to create post");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE POST
  const editPost = async (id: string, payload: any) => {
    try {
      setLoading(true);
      const { data } = await api.put(`/posts/${id}`, {
        ...payload,
        updatedAt: new Date().toISOString(),
      });
      updatePost(data);
      return data;
    } catch (e: any) {
      setError("Failed to update post");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // DELETE POST
  const removePost = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/posts/${id}`);
      deletePost(id);
    } catch (e: any) {
      setError("Failed to delete post");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    fetchPosts,
    fetchPostById,
    createPost,
    editPost,
    removePost,
    loading,
    error,
  };
}

export default usePosts;
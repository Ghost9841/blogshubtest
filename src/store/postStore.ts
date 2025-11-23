import { create } from "zustand";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  coverImage?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],

  setPosts: (posts) => set({ posts }),

  addPost: (post) =>
    set((state) => ({ posts: [...state.posts, post] })),

  updatePost: (post) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
}));

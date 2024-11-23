import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  publishedDate?: string; // Optional if not always present
}

export interface User {
  id: number;
  name: string;
  email: string;
}

// Utility function to get the authorization token
const getAuthToken = (): string => localStorage.getItem("token") || "";

/**
 * Hook to fetch user details
 */
export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate an API call to fetch user data
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/user"); // Replace with your actual endpoint
                if (!response.ok) throw new Error("Failed to fetch user");
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
};

/**
 * Hook to fetch a single blog by ID
 */
export const useBlog = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get<{ blog: Blog }>(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          { headers: { Authorization: getAuthToken() } }
        );
        setBlog(response.data.blog);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error fetching blog:", error);
        setError(error.response?.data?.message || "Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { blog, loading, error };
};

/**
 * Hook to fetch all blogs
 */
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<{ blogs: Blog[] }>(
          `${BACKEND_URL}/api/v1/blog/bulk`,
          { headers: { Authorization: getAuthToken() } }
        );
        setBlogs(response.data.blogs);
      } catch (err) {
        const error = err as AxiosError;
        console.error("Error fetching blogs:", error);
        setError(error.response?.data?.message || "Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};

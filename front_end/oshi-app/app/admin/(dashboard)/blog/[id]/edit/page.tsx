"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import ArticleEditorForm from "@/components/admin/ArticleEditorForm";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { getToken } = useAuth();
  const id = params?.id as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      if (!id) return;
      try {
        const token = await getToken();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/admin/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load article");
        }
        setArticle(data.data);
      } catch (err: any) {
        console.error("Fetch edit article error:", err);
        setError(err.message || "Failed to retrieve article details");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id, getToken]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 font-sans">
        <RefreshCw className="w-8 h-8 text-[var(--color-green)] animate-spin mx-auto opacity-60" />
        <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-green)]/60">
          Loading article editor data...
        </p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="p-8 rounded-3xl bg-red-50 border border-red-200 text-center space-y-3 max-w-md mx-auto my-12 font-sans">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
        <p className="text-sm font-semibold text-red-900">{error || "Article not found"}</p>
        <button
          onClick={() => router.push("/admin/blog")}
          className="px-5 py-2 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-wider uppercase"
        >
          Return to Articles
        </button>
      </div>
    );
  }

  return <ArticleEditorForm initialData={article} isEditing={true} />;
}

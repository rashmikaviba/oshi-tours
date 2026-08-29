"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import {
  Plus,
  Search,
  Edit2,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  FileText,
} from "lucide-react";

interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  titleWordCount: number;
  contentWordCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  hasThumbnail: boolean;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
}

export default function AdminBlogListPage() {
  const { getToken } = useAuth();
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/admin/blogs?search=${encodeURIComponent(search)}&status=${statusFilter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch articles");
      }
      setArticles(data.data);
    } catch (err: any) {
      console.error("Fetch articles error:", err);
      setError(err.message || "Failed to connect to backend service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [search, statusFilter]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete article");
      }

      setArticles((prev) => prev.filter((a) => a.id !== id));
      setDeleteModalId(null);
    } catch (err: any) {
      alert(`Delete Error: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleStatus = async (article: AdminArticle) => {
    const newStatus = article.status === "published" ? "draft" : "published";
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const formData = new FormData();
      formData.append("status", newStatus);

      const res = await fetch(`${apiUrl}/api/admin/blogs/${article.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || `Failed to ${newStatus} article`);
      }

      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, status: newStatus, publishedAt: newStatus === "published" ? new Date().toISOString() : a.publishedAt } : a))
      );
    } catch (err: any) {
      alert(`Status Update Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-green)]/15 pb-6">
        <div>
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--color-green)]/60 block mb-1">
            Editorial Management
          </span>
          <h1 className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl text-[var(--color-green)]">
            Blog Articles
          </h1>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-widest uppercase hover:bg-[rgb(20,32,18)] transition-all shadow-md shadow-[var(--color-green)]/10"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Search Bar & Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-green)]/40 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-[var(--color-green)]/20 bg-white/60 text-sm text-[var(--color-green)] placeholder:text-[var(--color-green)]/40 focus:outline-none focus:border-[var(--color-green)] focus:ring-1 focus:ring-[var(--color-green)] transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center bg-white/50 p-1 rounded-2xl border border-[var(--color-green)]/15 self-start md:self-auto">
          {(["all", "published", "draft"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                statusFilter === tab
                  ? "bg-[var(--color-green)] text-[var(--color-beige)] shadow-sm"
                  : "text-[var(--color-green)]/70 hover:text-[var(--color-green)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content State Rendering */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[var(--color-green)] animate-spin mx-auto opacity-60" />
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-green)]/60">
            Loading articles from database...
          </p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-3xl bg-red-50 border border-red-200 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <p className="text-sm font-semibold text-red-900">{error}</p>
          <button
            onClick={fetchArticles}
            className="px-5 py-2 rounded-full bg-red-900 text-white text-xs font-mono tracking-wider uppercase hover:bg-red-950 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      ) : articles.length === 0 ? (
        <div className="p-16 rounded-3xl bg-white/40 border border-dashed border-[var(--color-green)]/20 text-center space-y-4">
          <FileText className="w-12 h-12 text-[var(--color-green)]/30 mx-auto" />
          <h3 className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-[var(--color-green)]">
            No Articles Found
          </h3>
          <p className="text-xs text-[var(--color-green)]/70 max-w-sm mx-auto">
            {search
              ? `No articles matched your search query "${search}".`
              : "You have not created any blog articles yet. Start by writing your first article."}
          </p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-widest uppercase hover:bg-[rgb(20,32,18)] transition-all"
          >
            <Plus className="w-4 h-4" /> Create Article
          </Link>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[var(--color-green)]/15 overflow-hidden shadow-lg">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[var(--color-green)]/15 bg-[var(--color-green)]/5 text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-green)]/70">
                  <th className="py-4 px-6">Article</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Word Count</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-green)]/10 text-sm">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-white/80 transition-colors">
                    {/* Article Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {art.thumbnailUrl ? (
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${art.thumbnailUrl}`}
                            alt={art.thumbnailAlt || art.title}
                            className="w-12 h-12 rounded-xl object-cover border border-[var(--color-green)]/15 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-[var(--color-green)]/10 flex items-center justify-center text-[var(--color-green)]/40 text-xs font-mono flex-shrink-0">
                            No Img
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-[family-name:var(--font-grandslang-roman)] text-base text-[var(--color-green)] truncate max-w-xs sm:max-w-md">
                            {art.title}
                          </p>
                          <p className="text-xs font-mono text-[var(--color-green)]/50 truncate">
                            /{art.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleStatus(art)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all ${
                          art.status === "published"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
                        }`}
                        title="Click to toggle publish status"
                      >
                        {art.status === "published" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{art.status}</span>
                      </button>
                    </td>

                    {/* Word Count */}
                    <td className="py-4 px-4 font-mono text-xs text-[var(--color-green)]/70">
                      <div>Title: {art.titleWordCount}/15</div>
                      <div>Body: {art.contentWordCount}/600</div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs font-mono text-[var(--color-green)]/70">
                      {art.publishedAt
                        ? new Date(art.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : `Updated ${new Date(art.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}`}
                    </td>

                    {/* Action Controls */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {art.status === "published" && (
                          <Link
                            href={`/blog/${art.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl border border-[var(--color-green)]/15 text-[var(--color-green)]/70 hover:bg-[var(--color-green)]/10 hover:text-[var(--color-green)] transition-colors"
                            title="Preview Public View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/blog/${art.id}/edit`}
                          className="p-2 rounded-xl border border-[var(--color-green)]/15 text-[var(--color-green)]/70 hover:bg-[var(--color-green)]/10 hover:text-[var(--color-green)] transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteModalId(art.id)}
                          className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Cards */}
          <div className="md:hidden divide-y divide-[var(--color-green)]/15">
            {articles.map((art) => (
              <div key={art.id} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  {art.thumbnailUrl ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${art.thumbnailUrl}`}
                      alt={art.title}
                      className="w-14 h-14 rounded-xl object-cover border border-[var(--color-green)]/15 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[var(--color-green)]/10 flex items-center justify-center text-[var(--color-green)]/40 text-[10px] font-mono flex-shrink-0">
                      No Img
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-[family-name:var(--font-grandslang-roman)] text-lg text-[var(--color-green)] leading-tight mb-1">
                      {art.title}
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                        art.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {art.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[var(--color-green)]/60 pt-1">
                  <span>Body: {art.contentWordCount} words</span>
                  <span>
                    {art.publishedAt
                      ? new Date(art.publishedAt).toLocaleDateString()
                      : new Date(art.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Link
                    href={`/admin/blog/${art.id}/edit`}
                    className="flex-1 text-center py-2 rounded-xl bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-wider uppercase"
                  >
                    Edit Article
                  </Link>
                  {art.status === "published" && (
                    <Link
                      href={`/blog/${art.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl border border-[var(--color-green)]/20 text-[var(--color-green)]"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  )}
                  <button
                    onClick={() => setDeleteModalId(art.id)}
                    className="p-2 rounded-xl border border-red-200 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[var(--color-beige)] p-6 sm:p-8 rounded-3xl max-w-md w-full border border-[var(--color-green)]/20 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-[var(--color-green)]">
              Confirm Deletion
            </h3>
            <p className="text-xs text-[var(--color-green)]/70 leading-relaxed">
              Are you sure you want to permanently delete this article? This action cannot be undone and will purge the stored thumbnail image from MongoDB.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                disabled={deleting}
                className="px-5 py-2.5 rounded-full border border-[var(--color-green)]/20 text-xs font-mono tracking-wider uppercase text-[var(--color-green)] hover:bg-[var(--color-green)]/10"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                disabled={deleting}
                className="px-6 py-2.5 rounded-full bg-red-600 text-white text-xs font-mono tracking-wider uppercase hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

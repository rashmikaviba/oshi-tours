"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Upload,
  X,
  AlertTriangle,
  CheckCircle,
  Eye,
  Save,
  ArrowLeft,
} from "lucide-react";

interface ArticleEditorFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
    status: "draft" | "published";
    thumbnailUrl?: string | null;
    thumbnailAlt?: string;
    thumbnailName?: string;
  };
  isEditing?: boolean;
}

export default function ArticleEditorForm({ initialData, isEditing = false }: ArticleEditorFormProps) {
  const router = useRouter();
  const { getToken } = useAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [altText, setAltText] = useState(initialData?.thumbnailAlt || "");

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.thumbnailUrl ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${initialData.thumbnailUrl}` : null
  );
  const [removeThumbnail, setRemoveThumbnail] = useState(false);

  // Form State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Word Counters Helper
  const countWords = (text: string): number => {
    if (!text || typeof text !== "string") return 0;
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  };

  const titleWordCount = countWords(title);
  const contentWordCount = countWords(content);

  const titleValid = titleWordCount > 0 && titleWordCount <= 15;
  const contentValid = contentWordCount > 0 && contentWordCount <= 600;

  useEffect(() => {
    setIsDirty(true);
  }, [title, content, altText, selectedFile, removeThumbnail]);

  // Handle Image Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 1 MB = 1,048,576 bytes
    if (file.size > 1024 * 1024) {
      setErrorMessage("Image upload rejected: File size exceeds the maximum limit of 1 MB.");
      return;
    }

    // Check mime type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErrorMessage("Invalid image format: Only JPG/JPEG and PNG image files are allowed.");
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    setRemoveThumbnail(false);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setRemoveThumbnail(true);
  };

  // Submit Handler
  const handleSubmit = async (targetStatus: "draft" | "published") => {
    setErrorMessage(null);

    // Enforce Word Limits
    if (!title.trim()) {
      setErrorMessage("Please enter an article heading title.");
      return;
    }
    if (titleWordCount > 15) {
      setErrorMessage(`Article title exceeds maximum limit of 15 words (current: ${titleWordCount} words).`);
      return;
    }

    if (!content.trim()) {
      setErrorMessage("Please enter article content body.");
      return;
    }
    if (contentWordCount > 600) {
      setErrorMessage(`Article content exceeds maximum limit of 600 words (current: ${contentWordCount} words).`);
      return;
    }

    // Enforce Publish Constraints
    if (targetStatus === "published") {
      if (!previewUrl && !selectedFile) {
        setErrorMessage("A thumbnail image is strictly required before publishing an article.");
        return;
      }
      if (!altText.trim()) {
        setErrorMessage("Descriptive alt text is required for the thumbnail image before publishing.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("status", targetStatus);
      formData.append("altText", altText);

      if (selectedFile) {
        formData.append("thumbnail", selectedFile);
      }
      if (removeThumbnail) {
        formData.append("removeThumbnail", "true");
      }

      const endpoint = isEditing ? `${apiUrl}/api/admin/blogs/${initialData?.id}` : `${apiUrl}/api/admin/blogs`;
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save article");
      }

      setIsDirty(false);
      router.refresh();
      router.push("/admin/blog");
    } catch (err: any) {
      console.error("Save article error:", err);
      setErrorMessage(err.message || "Failed to connect to backend server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-green)]/15 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isDirty && !confirm("You have unsaved changes. Are you sure you want to leave?")) return;
              router.push("/admin/blog");
            }}
            className="p-2 rounded-xl border border-[var(--color-green)]/15 text-[var(--color-green)] hover:bg-[var(--color-green)]/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--color-green)]/60 block">
              {isEditing ? "Edit Article" : "Create New Article"}
            </span>
            <h1 className="font-[family-name:var(--font-grandslang-roman)] text-3xl text-[var(--color-green)]">
              {isEditing ? "Edit Essay" : "New Essay Entry"}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2.5 rounded-full border border-[var(--color-green)]/20 text-xs font-mono tracking-wider uppercase text-[var(--color-green)] hover:bg-[var(--color-green)]/10 transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSubmit("draft")}
            className="px-5 py-2.5 rounded-full border border-[var(--color-green)] bg-white/60 text-xs font-mono tracking-wider uppercase text-[var(--color-green)] hover:bg-[var(--color-green)]/10 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button
            type="button"
            disabled={submitting || !titleValid || !contentValid}
            onClick={() => handleSubmit("published")}
            className="px-6 py-2.5 rounded-full bg-[var(--color-green)] text-[var(--color-beige)] text-xs font-mono tracking-widest uppercase hover:bg-[rgb(20,32,18)] transition-all shadow-md flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4" /> {isEditing && initialData?.status === "published" ? "Update Article" : "Publish Article"}
          </button>
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs font-mono flex items-start gap-3 animate-in fade-in duration-200">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">{errorMessage}</div>
          <button onClick={() => setErrorMessage(null)} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Form Fields Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Heading & Body Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article Heading Field */}
          <div className="space-y-2 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-[var(--color-green)]/15">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono tracking-widest uppercase text-[var(--color-green)] font-semibold">
                Article Heading Title *
              </label>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                  titleWordCount > 15
                    ? "bg-red-100 text-red-700 font-bold"
                    : titleWordCount > 12
                    ? "bg-amber-100 text-amber-800"
                    : "bg-[var(--color-green)]/10 text-[var(--color-green)]"
                }`}
              >
                {titleWordCount} / 15 words
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. Misted Tea Highlands & Forgotten Kingdoms of Ceylon"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-[var(--color-green)]/20 bg-white/80 font-[family-name:var(--font-grandslang-roman)] text-xl text-[var(--color-green)] placeholder:text-[var(--color-green)]/30 focus:outline-none focus:border-[var(--color-green)] focus:ring-1 focus:ring-[var(--color-green)]"
            />
            {titleWordCount > 15 && (
              <p className="text-xs text-red-600 font-mono mt-1">
                Heading exceeds limit! Please reduce title to 15 words or fewer.
              </p>
            )}
          </div>

          {/* Article Content Field */}
          <div className="space-y-2 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-[var(--color-green)]/15">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono tracking-widest uppercase text-[var(--color-green)] font-semibold">
                Article Body Content *
              </label>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                  contentWordCount > 600
                    ? "bg-red-100 text-red-700 font-bold"
                    : contentWordCount > 500
                    ? "bg-amber-100 text-amber-800 font-semibold"
                    : "bg-[var(--color-green)]/10 text-[var(--color-green)]"
                }`}
              >
                {contentWordCount} / 600 words
              </span>
            </div>
            <textarea
              rows={14}
              placeholder="Write your editorial article here... (Maximum 600 words)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-2xl border border-[var(--color-green)]/20 bg-white/80 font-sans text-sm leading-relaxed text-[var(--color-green)] placeholder:text-[var(--color-green)]/30 focus:outline-none focus:border-[var(--color-green)] focus:ring-1 focus:ring-[var(--color-green)] resize-y"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-green)]/60 pt-1">
              <span>Supports multi-line paragraph formatting</span>
              {contentWordCount > 500 && contentWordCount <= 600 && (
                <span className="text-amber-700 font-medium">Approaching 600 word limit</span>
              )}
              {contentWordCount > 600 && (
                <span className="text-red-600 font-bold">Exceeds 600 word limit</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Thumbnail & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          {/* Thumbnail Upload Card */}
          <div className="space-y-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-[var(--color-green)]/15">
            <label className="text-xs font-mono tracking-widest uppercase text-[var(--color-green)] font-semibold block">
              Thumbnail Image (Max 1 MB)
            </label>

            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-[var(--color-green)]/20 bg-black/5 group">
                <img
                  src={previewUrl}
                  alt={altText || "Article Thumbnail Preview"}
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 rounded-full bg-red-600 text-white shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                  title="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 p-6 rounded-2xl border-2 border-dashed border-[var(--color-green)]/25 bg-white/40 hover:bg-white/70 cursor-pointer transition-all text-center group">
                <Upload className="w-8 h-8 text-[var(--color-green)]/40 group-hover:text-[var(--color-green)] transition-colors mb-2" />
                <span className="text-xs font-mono tracking-wider uppercase text-[var(--color-green)] font-semibold">
                  Upload Thumbnail
                </span>
                <span className="text-[10px] text-[var(--color-green)]/50 mt-1">
                  JPG or PNG, max 1 MB
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}

            {/* Alt Text Field */}
            <div className="space-y-1 pt-2">
              <label className="text-[11px] font-mono tracking-wider uppercase text-[var(--color-green)]/80 block">
                Image Alt Text (Required for Publish)
              </label>
              <input
                type="text"
                placeholder="e.g. Misted morning view over Ceylon tea plantation"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-green)]/20 bg-white/80 text-xs text-[var(--color-green)] placeholder:text-[var(--color-green)]/30 focus:outline-none focus:border-[var(--color-green)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 z-50 animate-in fade-in duration-200">
          <div className="bg-[var(--color-beige)] max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-[var(--color-green)]/20 shadow-2xl p-6 sm:p-10 relative space-y-6">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-[var(--color-green)]/20 text-[var(--color-green)] hover:bg-[var(--color-green)]/10"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-green)]/60 block">
              Editorial Preview
            </span>

            <h1 className="font-[family-name:var(--font-grandslang-roman)] text-3xl sm:text-4xl text-[var(--color-green)] leading-tight">
              {title || "Untitled Article Heading"}
            </h1>

            {previewUrl && (
              <div className="rounded-2xl overflow-hidden border border-[var(--color-green)]/15">
                <img src={previewUrl} alt={altText || title} className="w-full max-h-80 object-cover" />
                {altText && (
                  <p className="p-2 text-center text-[10px] font-mono text-[var(--color-green)]/60 bg-white/40">
                    {altText}
                  </p>
                )}
              </div>
            )}

            <div className="prose font-sans text-sm text-[var(--color-green)]/90 leading-relaxed whitespace-pre-line border-t border-[var(--color-green)]/15 pt-6">
              {content || "No body content written yet."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

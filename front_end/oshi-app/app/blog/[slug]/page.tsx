import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PublicBlogDetail {
 id: string;
 title: string;
 slug: string;
 content: string;
 publishedAt: string;
 thumbnailUrl: string | null;
 thumbnailAlt: string;
 wordCount: number;
 prevArticle?: { title: string; slug: string } | null;
 nextArticle?: { title: string; slug: string } | null;
}

async function getArticleBySlug(slug: string): Promise<PublicBlogDetail | null> {
 try {
 const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
 const res = await fetch(`${apiUrl}/api/blogs/${slug}`, {
 cache: "no-store",
 });
 if (!res.ok) return null;
 const json = await res.json();
 return json.success ? json.data : null;
 } catch (err) {
 console.error("Fetch article slug error:", err);
 return null;
 }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
 const resolvedParams = await params;
 const article = await getArticleBySlug(resolvedParams.slug);

 if (!article) {
 return {
 title: "Article Not Found, OSHĪ",
 };
 }

 const excerpt = article.content.slice(0, 160).trim();
 const ogImageUrl = article.thumbnailUrl
 ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${article.thumbnailUrl}`
 : undefined;

 return {
 title: `${article.title}, OSHĪ Journal`,
 description: excerpt,
 openGraph: {
 title: article.title,
 description: excerpt,
 type: "article",
 publishedTime: article.publishedAt,
 images: ogImageUrl ? [{ url: ogImageUrl, alt: article.thumbnailAlt }] : undefined,
 },
 twitter: {
 card: "summary_large_image",
 title: article.title,
 description: excerpt,
 images: ogImageUrl ? [ogImageUrl] : undefined,
 },
 };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
 const resolvedParams = await params;
 const article = await getArticleBySlug(resolvedParams.slug);

 if (!article) {
 notFound();
 }

 const readingTime = Math.max(1, Math.ceil(article.wordCount / 200));

 return (
 <div className="min-h-screen bg-[var(--color-beige)] text-[var(--color-green)] flex flex-col font-sans selection:bg-[var(--color-green)] selection:text-[var(--color-beige)]">
 {/* Shared Public Navigation Header */}
 <Navbar />

 {/* Reading Container */}
 <main className="flex-1 pt-32 sm:pt-40 pb-24 px-6 sm:px-8 max-w-3xl mx-auto w-full space-y-10">
 {/* Back Link */}
 <Link
 href="/blog"
 className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[var(--color-green)]/60 hover:text-[var(--color-green)] transition-colors group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 <span>Back to Journal</span>
 </Link>

 {/* Article Heading Header */}
 <header className="space-y-4">
 <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-green)]/60">
 <span className="bg-[var(--color-green)]/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[var(--color-green)] font-semibold">
 Essay
 </span>
 <time dateTime={article.publishedAt}>
 {new Date(article.publishedAt).toLocaleDateString("en-US", {
 month: "long",
 day: "numeric",
 year: "numeric",
 })}
 </time>
 <span>•</span>
 <span className="flex items-center gap-1">
 <Clock className="w-3.5 h-3.5" /> {readingTime} min read
 </span>
 </div>

 <h1 className="font-[family-name:var(--font-grandslang-roman)] text-4xl sm:text-5xl md:text-6xl text-[var(--color-green)] leading-[1.08] tracking-tight">
 {article.title}
 </h1>
 </header>

 {/* Hero Thumbnail Display */}
 {article.thumbnailUrl && (
 <figure className="space-y-2">
 <div className="rounded-3xl overflow-hidden border border-[var(--color-green)]/15 shadow-xl aspect-[16/10] bg-[var(--color-green)]/5">
 <img
 src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${article.thumbnailUrl}`}
 alt={article.thumbnailAlt || article.title}
 className="w-full h-full object-cover"
 />
 </div>
 {article.thumbnailAlt && (
 <figcaption className="text-center text-xs font-mono text-[var(--color-green)]/60 italic pt-1">
 {article.thumbnailAlt}
 </figcaption>
 )}
 </figure>
 )}

 {/* Article Body Content */}
 <article className="prose font-[family-name:var(--font-newsreader-var)] text-lg sm:text-xl leading-relaxed text-[var(--color-green)]/90 whitespace-pre-line border-t border-b border-[var(--color-green)]/15 py-10 my-8">
 {article.content}
 </article>

 {/* Article Footer & Prev / Next Article Navigation */}
 <footer className="pt-6 space-y-8">
 <div className="flex items-center justify-between border-b border-[var(--color-green)]/15 pb-6">
 <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-green)]/60">
 OSHĪ Editorial Series
 </span>
 <Link
 href="/trip-planner"
 className="text-xs font-mono tracking-widest uppercase text-[var(--color-green)] hover:underline font-semibold"
 >
 Plan A Custom Journey ↗
 </Link>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {article.prevArticle ? (
 <Link
 href={`/blog/${article.prevArticle.slug}`}
 className="p-5 rounded-2xl border border-[var(--color-green)]/15 hover:border-[var(--color-green)]/30 bg-white/40 hover:bg-white/70 transition-all space-y-1 text-left group"
 >
 <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-green)]/50 block">
 ← Previous Article
 </span>
 <span className="font-[family-name:var(--font-grandslang-roman)] text-base text-[var(--color-green)] group-hover:text-[rgb(20,32,18)] line-clamp-1 block">
 {article.prevArticle.title}
 </span>
 </Link>
 ) : <div />}

 {article.nextArticle ? (
 <Link
 href={`/blog/${article.nextArticle.slug}`}
 className="p-5 rounded-2xl border border-[var(--color-green)]/15 hover:border-[var(--color-green)]/30 bg-white/40 hover:bg-white/70 transition-all space-y-1 text-right group"
 >
 <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-green)]/50 block">
 Next Article →
 </span>
 <span className="font-[family-name:var(--font-grandslang-roman)] text-base text-[var(--color-green)] group-hover:text-[rgb(20,32,18)] line-clamp-1 block">
 {article.nextArticle.title}
 </span>
 </Link>
 ) : <div />}
 </div>
 </footer>
 </main>

 {/* Shared Public Footer */}
 <Footer />
 </div>
 );
}

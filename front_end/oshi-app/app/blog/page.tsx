import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Calendar, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
 title: "Journal & Essays, OSHĪ Luxury Sri Lanka Travel",
 description:
 "Refined travel journals, cultural essays, and insider stories from Sri Lanka's rarest sanctuaries and heritage landscapes.",
 openGraph: {
 title: "Journal & Essays, OSHĪ Luxury Sri Lanka Travel",
 description:
 "Refined travel journals, cultural essays, and insider stories from Sri Lanka's rarest sanctuaries.",
 type: "website",
 },
};

interface PublicArticle {
 id: string;
 title: string;
 slug: string;
 excerpt: string;
 publishedAt: string;
 thumbnailUrl: string | null;
 thumbnailAlt: string;
 wordCount: number;
}

async function fetchPublishedArticles(page = 1, limit = 9): Promise<{ data: PublicArticle[]; pagination: any }> {
 try {
 const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
 const res = await fetch(`${apiUrl}/api/blogs?page=${page}&limit=${limit}`, {
 cache: "no-store",
 });
 if (!res.ok) return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
 return await res.json();
 } catch (err) {
 console.error("Fetch public articles error:", err);
 return { data: [], pagination: { total: 0, page: 1, totalPages: 1 } };
 }
}

export default async function BlogIndexPage() {
 const { data: articles } = await fetchPublishedArticles(1, 9);

 return (
 <div className="min-h-screen bg-[var(--color-beige)] text-[var(--color-green)] flex flex-col font-sans selection:bg-[var(--color-green)] selection:text-[var(--color-beige)]">
 {/* Shared Public Navigation Header */}
 <Navbar />

 {/* Main Editorial Hero Banner */}
 <section className="pt-32 sm:pt-40 md:pt-44 pb-16 sm:pb-20 px-6 sm:px-12 max-w-7xl mx-auto w-full relative">
 <div className="max-w-3xl space-y-4">
 <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--color-green)]/60 block">
 Essays & Journals
 </span>
 <h1 className="font-[family-name:var(--font-grandslang-roman)] text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-[var(--color-green)]">
 Perspectives on <span className="italic font-normal">Ceylon</span>
 </h1>
 <p className="font-[family-name:var(--font-newsreader-var)] text-lg sm:text-xl text-[var(--color-green)]/80 leading-relaxed pt-2">
 Curated narratives on Sri Lanka's living heritage, unhurried sanctuaries, wildlife migrations, and private design journeys.
 </p>
 </div>
 </section>

 {/* Main Articles Grid Section */}
 <main className="flex-1 pb-24 px-6 sm:px-12 max-w-7xl mx-auto w-full space-y-16">
 {articles.length === 0 ? (
 <div className="py-24 text-center space-y-4 border-t border-b border-[var(--color-green)]/15 my-8">
 <BookOpen className="w-10 h-10 text-[var(--color-green)]/30 mx-auto" />
 <h3 className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-[var(--color-green)]">
 Journals Coming Soon
 </h3>
 <p className="font-[family-name:var(--font-newsreader-var)] text-sm text-[var(--color-green)]/70 max-w-md mx-auto">
 Our editorial writers are preparing private travel stories and cultural essays. Please check back shortly.
 </p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
 {articles.map((art) => (
 <article
 key={art.id}
 className="group flex flex-col bg-white/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-[var(--color-green)]/15 hover:border-[var(--color-green)]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
 >
 {/* Thumbnail Image Container */}
 <Link href={`/blog/${art.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-[var(--color-green)]/10">
 {art.thumbnailUrl ? (
 <img
 src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${art.thumbnailUrl}`}
 alt={art.thumbnailAlt || art.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--color-green)]/40 bg-[var(--color-green)]/5">
 OSHĪ Journal
 </div>
 )}
 <div className="absolute top-4 left-4 bg-[var(--color-beige)]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[var(--color-green)]">
 Essay
 </div>
 </Link>

 {/* Article Info Body */}
 <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
 <div className="space-y-3">
 {/* Publication Date */}
 <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-green)]/60">
 <Calendar className="w-3.5 h-3.5" />
 <time dateTime={art.publishedAt}>
 {new Date(art.publishedAt).toLocaleDateString("en-US", {
 month: "long",
 day: "numeric",
 year: "numeric",
 })}
 </time>
 <span>•</span>
 <span>{Math.max(1, Math.ceil(art.wordCount / 200))} min read</span>
 </div>

 {/* Title */}
 <Link href={`/blog/${art.slug}`}>
 <h2 className="font-[family-name:var(--font-grandslang-roman)] text-2xl text-[var(--color-green)] group-hover:text-[rgb(20,32,18)] leading-snug transition-colors">
 {art.title}
 </h2>
 </Link>

 {/* Excerpt */}
 <p className="font-[family-name:var(--font-newsreader-var)] text-sm text-[var(--color-green)]/75 leading-relaxed line-clamp-3">
 {art.excerpt}
 </p>
 </div>

 {/* Interaction Link */}
 <div className="pt-4 border-t border-[var(--color-green)]/10 flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[var(--color-green)] group-hover:text-[rgb(20,32,18)] font-semibold">
 <Link href={`/blog/${art.slug}`} className="inline-flex items-center gap-1.5">
 <span>Read Article</span>
 <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
 </Link>
 </div>
 </div>
 </article>
 ))}
 </div>
 )}
 </main>

 {/* Shared Public Footer */}
 <Footer />
 </div>
 );
}

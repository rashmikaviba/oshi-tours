import React from "react";
import ArticleEditorForm from "@/components/admin/ArticleEditorForm";

export const metadata = {
  title: "New Article — OSHĪ Admin",
  robots: { index: false, follow: false },
};

export default function NewArticlePage() {
  return <ArticleEditorForm isEditing={false} />;
}

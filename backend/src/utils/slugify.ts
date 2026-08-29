import { BlogArticle } from '../models/BlogArticle';

export function slugifyText(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export async function generateUniqueSlug(title: string, currentArticleId?: string): Promise<string> {
  const baseSlug = slugifyText(title) || 'article';
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await BlogArticle.findOne({ slug });
    if (!existing || (currentArticleId && existing._id.toString() === currentArticleId)) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

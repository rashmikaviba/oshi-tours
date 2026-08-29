"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyText = slugifyText;
exports.generateUniqueSlug = generateUniqueSlug;
const BlogArticle_1 = require("../models/BlogArticle");
function slugifyText(text) {
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
async function generateUniqueSlug(title, currentArticleId) {
    const baseSlug = slugifyText(title) || 'article';
    let slug = baseSlug;
    let counter = 1;
    while (true) {
        const existing = await BlogArticle_1.BlogArticle.findOne({ slug });
        if (!existing || (currentArticleId && existing._id.toString() === currentArticleId)) {
            return slug;
        }
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
}
//# sourceMappingURL=slugify.js.map
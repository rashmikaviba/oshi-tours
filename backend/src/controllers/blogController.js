"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadThumbnail = void 0;
exports.getPublicBlogs = getPublicBlogs;
exports.getPublicBlogBySlug = getPublicBlogBySlug;
exports.getBlogThumbnail = getBlogThumbnail;
exports.getAdminBlogs = getAdminBlogs;
exports.getAdminBlogById = getAdminBlogById;
exports.createAdminBlog = createAdminBlog;
exports.updateAdminBlog = updateAdminBlog;
exports.deleteAdminBlog = deleteAdminBlog;
const multer_1 = __importDefault(require("multer"));
const BlogArticle_1 = require("../models/BlogArticle");
const fileValidation_1 = require("../utils/fileValidation");
const slugify_1 = require("../utils/slugify");
const connect_1 = require("../db/connect");
// Multer memory storage configuration with 1 MB strict file size limit
const storage = multer_1.default.memoryStorage();
exports.uploadThumbnail = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB limit
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid image format. Only JPG/JPEG and PNG files are allowed.'));
        }
    },
});
/**
 * 1. PUBLIC: GET /api/blogs
 * Returns published articles (lightweight DTOs without binary thumbnail data)
 */
async function getPublicBlogs(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(20, Math.max(1, parseInt(req.query.limit) || 6));
        const skip = (page - 1) * limit;
        const query = { status: 'published' };
        const total = await BlogArticle_1.BlogArticle.countDocuments(query);
        const articles = await BlogArticle_1.BlogArticle.find(query)
            .select('-thumbnail.data')
            .sort({ publishedAt: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        const formattedArticles = articles.map((art) => ({
            id: art._id,
            title: art.title,
            slug: art.slug,
            excerpt: art.content.slice(0, 160).trim() + (art.content.length > 160 ? '...' : ''),
            publishedAt: art.publishedAt || art.createdAt,
            updatedAt: art.updatedAt,
            createdAt: art.createdAt,
            thumbnailUrl: art.thumbnail ? `/api/blogs/${art.slug}/thumbnail?v=${new Date(art.updatedAt || art.createdAt).getTime()}` : null,
            thumbnailAlt: art.thumbnail?.altText || art.title,
            wordCount: (0, fileValidation_1.countWords)(art.content),
        }));
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).json({
            success: true,
            data: formattedArticles,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        console.error('[BlogController] getPublicBlogs error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to retrieve published blog posts' });
    }
}
/**
 * 2. PUBLIC: GET /api/blogs/:slug
 * Returns single published article by slug
 */
async function getPublicBlogBySlug(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const { slug } = req.params;
        const articleQuery = { slug, status: 'published' };
        const article = await BlogArticle_1.BlogArticle.findOne(articleQuery)
            .select('-thumbnail.data')
            .lean();
        if (!article) {
            res.status(404).json({ success: false, error: 'Article not found' });
            return;
        }
        // Fetch prev and next published articles for reading navigation
        const prevQuery = {
            status: 'published',
            publishedAt: { $lt: article.publishedAt || article.createdAt },
        };
        const prevArticle = await BlogArticle_1.BlogArticle.findOne(prevQuery)
            .select('title slug')
            .sort({ publishedAt: -1 })
            .lean();
        const nextQuery = {
            status: 'published',
            publishedAt: { $gt: article.publishedAt || article.createdAt },
        };
        const nextArticle = await BlogArticle_1.BlogArticle.findOne(nextQuery)
            .select('title slug')
            .sort({ publishedAt: 1 })
            .lean();
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).json({
            success: true,
            data: {
                id: article._id,
                title: article.title,
                slug: article.slug,
                content: article.content,
                publishedAt: article.publishedAt || article.createdAt,
                updatedAt: article.updatedAt,
                thumbnailUrl: article.thumbnail ? `/api/blogs/${article.slug}/thumbnail?v=${new Date(article.updatedAt || article.createdAt).getTime()}` : null,
                thumbnailAlt: article.thumbnail?.altText || article.title,
                wordCount: (0, fileValidation_1.countWords)(article.content),
                prevArticle: prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null,
                nextArticle: nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null,
            },
        });
    }
    catch (error) {
        console.error('[BlogController] getPublicBlogBySlug error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to retrieve article details' });
    }
}
/**
 * 3. PUBLIC: GET /api/blogs/:slug/thumbnail
 * Serves binary thumbnail image buffer
 */
async function getBlogThumbnail(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const { slug } = req.params;
        const findQuery = { slug };
        const article = await BlogArticle_1.BlogArticle.findOne(findQuery).select('thumbnail status updatedAt');
        if (!article || !article.thumbnail || !article.thumbnail.data) {
            res.status(404).send('Image not found');
            return;
        }
        const { data, mimeType } = article.thumbnail;
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        if (article.updatedAt) {
            res.setHeader('Last-Modified', new Date(article.updatedAt).toUTCString());
        }
        res.status(200).send(data);
    }
    catch (error) {
        console.error('[BlogController] getBlogThumbnail error:', error.message);
        res.status(500).send('Error loading image');
    }
}
/**
 * 4. ADMIN: GET /api/admin/blogs
 * Returns all articles (drafts + published) with search and status filters
 */
async function getAdminBlogs(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const search = req.query.search || '';
        const status = req.query.status || 'all';
        const filter = {};
        if (status === 'draft' || status === 'published') {
            filter.status = status;
        }
        if (search.trim()) {
            filter.title = { $regex: search.trim(), $options: 'i' };
        }
        const articles = await BlogArticle_1.BlogArticle.find(filter)
            .select('-thumbnail.data')
            .sort({ updatedAt: -1 })
            .lean();
        const formatted = articles.map((art) => ({
            id: art._id,
            title: art.title,
            slug: art.slug,
            status: art.status,
            titleWordCount: (0, fileValidation_1.countWords)(art.title),
            contentWordCount: (0, fileValidation_1.countWords)(art.content),
            publishedAt: art.publishedAt,
            createdAt: art.createdAt,
            updatedAt: art.updatedAt,
            hasThumbnail: !!art.thumbnail,
            thumbnailUrl: art.thumbnail ? `/api/blogs/${art.slug}/thumbnail?v=${new Date(art.updatedAt || art.createdAt).getTime()}` : null,
            thumbnailAlt: art.thumbnail?.altText || '',
        }));
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).json({
            success: true,
            data: formatted,
        });
    }
    catch (error) {
        console.error('[BlogController] getAdminBlogs error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to fetch admin articles list' });
    }
}
/**
 * 5. ADMIN: GET /api/admin/blogs/:id
 * Returns post by ID for editor
 */
async function getAdminBlogById(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const { id } = req.params;
        const article = await BlogArticle_1.BlogArticle.findById(id).select('-thumbnail.data').lean();
        if (!article) {
            res.status(404).json({ success: false, error: 'Article not found' });
            return;
        }
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).json({
            success: true,
            data: {
                id: article._id,
                title: article.title,
                slug: article.slug,
                content: article.content,
                status: article.status,
                hasThumbnail: !!article.thumbnail,
                thumbnailUrl: article.thumbnail ? `/api/blogs/${article.slug}/thumbnail?v=${new Date(article.updatedAt || article.createdAt).getTime()}` : null,
                thumbnailAlt: article.thumbnail?.altText || '',
                thumbnailName: article.thumbnail?.originalName || '',
                publishedAt: article.publishedAt,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
            },
        });
    }
    catch (error) {
        console.error('[BlogController] getAdminBlogById error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to retrieve article' });
    }
}
/**
 * 6. ADMIN: POST /api/admin/blogs
 * Creates a new article (draft or published)
 */
async function createAdminBlog(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const title = (req.body.title || '').trim();
        const content = (req.body.content || '').trim();
        const status = req.body.status === 'published' ? 'published' : 'draft';
        const altText = (req.body.altText || '').trim();
        // Word Count Validations
        const titleWordCount = (0, fileValidation_1.countWords)(title);
        if (!title) {
            res.status(400).json({ success: false, error: 'Article title is required' });
            return;
        }
        if (titleWordCount > 15) {
            res.status(400).json({
                success: false,
                error: `Article title exceeds the maximum limit of 15 words (current: ${titleWordCount} words)`,
            });
            return;
        }
        const contentWordCount = (0, fileValidation_1.countWords)(content);
        if (!content) {
            res.status(400).json({ success: false, error: 'Article content is required' });
            return;
        }
        if (contentWordCount > 600) {
            res.status(400).json({
                success: false,
                error: `Article content exceeds the maximum limit of 600 words (current: ${contentWordCount} words)`,
            });
            return;
        }
        // Thumbnail Processing
        let thumbnailData = undefined;
        if (req.file) {
            // Magic Bytes File Signature Validation
            const magicCheck = (0, fileValidation_1.validateMagicBytes)(req.file.buffer);
            if (!magicCheck.isValid || !magicCheck.mimeType) {
                res.status(400).json({
                    success: false,
                    error: 'Security Rejection: Invalid file signature. Only authentic JPG/JPEG and PNG image files are allowed.',
                });
                return;
            }
            thumbnailData = {
                data: req.file.buffer,
                mimeType: magicCheck.mimeType,
                originalName: req.file.originalname,
                size: req.file.size,
                altText: altText || title,
            };
        }
        // Publishing Requirements Check
        if (status === 'published') {
            if (!thumbnailData) {
                res.status(400).json({
                    success: false,
                    error: 'A thumbnail image is strictly required before publishing an article.',
                });
                return;
            }
            if (!altText) {
                res.status(400).json({
                    success: false,
                    error: 'Descriptive alt text is required for the thumbnail before publishing.',
                });
                return;
            }
        }
        const slug = await (0, slugify_1.generateUniqueSlug)(title);
        const newArticle = new BlogArticle_1.BlogArticle({
            title,
            slug,
            content,
            status,
            thumbnail: thumbnailData,
            authorClerkUserId: req.userId || 'admin',
            publishedAt: status === 'published' ? new Date() : undefined,
        });
        await newArticle.save();
        res.status(201).json({
            success: true,
            message: status === 'published' ? 'Article published successfully' : 'Draft saved successfully',
            data: {
                id: newArticle._id,
                slug: newArticle.slug,
                status: newArticle.status,
            },
        });
    }
    catch (error) {
        console.error('[BlogController] createAdminBlog error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to create article' });
    }
}
/**
 * 7. ADMIN: PATCH /api/admin/blogs/:id
 * Updates article fields, status, or thumbnail
 */
async function updateAdminBlog(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const { id } = req.params;
        const article = await BlogArticle_1.BlogArticle.findById(id);
        if (!article) {
            res.status(404).json({ success: false, error: 'Article not found' });
            return;
        }
        const title = req.body.title !== undefined ? req.body.title.trim() : article.title;
        const content = req.body.content !== undefined ? req.body.content.trim() : article.content;
        const status = req.body.status || article.status;
        const altText = req.body.altText !== undefined ? req.body.altText.trim() : article.thumbnail?.altText || '';
        const removeThumbnail = req.body.removeThumbnail === 'true' || req.body.removeThumbnail === true;
        // Word Count Validations
        const titleWordCount = (0, fileValidation_1.countWords)(title);
        if (!title) {
            res.status(400).json({ success: false, error: 'Article title cannot be empty' });
            return;
        }
        if (titleWordCount > 15) {
            res.status(400).json({
                success: false,
                error: `Article title exceeds the maximum limit of 15 words (current: ${titleWordCount} words)`,
            });
            return;
        }
        const contentWordCount = (0, fileValidation_1.countWords)(content);
        if (!content) {
            res.status(400).json({ success: false, error: 'Article content cannot be empty' });
            return;
        }
        if (contentWordCount > 600) {
            res.status(400).json({
                success: false,
                error: `Article content exceeds the maximum limit of 600 words (current: ${contentWordCount} words)`,
            });
            return;
        }
        // Slug update if title changed
        if (title !== article.title) {
            article.slug = await (0, slugify_1.generateUniqueSlug)(title, article._id.toString());
        }
        article.title = title;
        article.content = content;
        // Thumbnail updates
        if (removeThumbnail) {
            article.thumbnail = null;
        }
        else if (req.file) {
            const magicCheck = (0, fileValidation_1.validateMagicBytes)(req.file.buffer);
            if (!magicCheck.isValid || !magicCheck.mimeType) {
                res.status(400).json({
                    success: false,
                    error: 'Security Rejection: Invalid file signature. Only authentic JPG/JPEG and PNG image files are allowed.',
                });
                return;
            }
            article.thumbnail = {
                data: req.file.buffer,
                mimeType: magicCheck.mimeType,
                originalName: req.file.originalname,
                size: req.file.size,
                altText: altText || title,
            };
        }
        else if (article.thumbnail) {
            article.thumbnail.altText = altText;
        }
        // Publishing Validation
        if (status === 'published') {
            if (!article.thumbnail || !article.thumbnail.data) {
                res.status(400).json({
                    success: false,
                    error: 'A thumbnail image is strictly required before publishing an article.',
                });
                return;
            }
            if (!article.thumbnail.altText) {
                res.status(400).json({
                    success: false,
                    error: 'Descriptive alt text is required for the thumbnail before publishing.',
                });
                return;
            }
            if (article.status !== 'published') {
                article.publishedAt = new Date();
            }
        }
        article.status = status;
        article.updatedAt = new Date();
        await article.save();
        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            data: {
                id: article._id,
                slug: article.slug,
                status: article.status,
            },
        });
    }
    catch (error) {
        console.error('[BlogController] updateAdminBlog error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to update article' });
    }
}
/**
 * 8. ADMIN: DELETE /api/admin/blogs/:id
 * Deletes article and purges binary thumbnail
 */
async function deleteAdminBlog(req, res) {
    try {
        await (0, connect_1.connectToDatabase)();
        const { id } = req.params;
        const article = await BlogArticle_1.BlogArticle.findByIdAndDelete(id);
        if (!article) {
            res.status(404).json({ success: false, error: 'Article not found' });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Article and thumbnail deleted successfully',
        });
    }
    catch (error) {
        console.error('[BlogController] deleteAdminBlog error:', error.message);
        res.status(500).json({ success: false, error: error.message || 'Failed to delete article' });
    }
}
//# sourceMappingURL=blogController.js.map
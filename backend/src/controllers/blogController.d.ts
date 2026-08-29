import { Request, Response } from 'express';
import multer from 'multer';
import { AuthenticatedRequest } from '../middleware/clerkAuth';
export declare const uploadThumbnail: multer.Multer;
/**
 * 1. PUBLIC: GET /api/blogs
 * Returns published articles (lightweight DTOs without binary thumbnail data)
 */
export declare function getPublicBlogs(req: Request, res: Response): Promise<void>;
/**
 * 2. PUBLIC: GET /api/blogs/:slug
 * Returns single published article by slug
 */
export declare function getPublicBlogBySlug(req: Request, res: Response): Promise<void>;
/**
 * 3. PUBLIC: GET /api/blogs/:slug/thumbnail
 * Serves binary thumbnail image buffer
 */
export declare function getBlogThumbnail(req: Request, res: Response): Promise<void>;
/**
 * 4. ADMIN: GET /api/admin/blogs
 * Returns all articles (drafts + published) with search and status filters
 */
export declare function getAdminBlogs(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * 5. ADMIN: GET /api/admin/blogs/:id
 * Returns post by ID for editor
 */
export declare function getAdminBlogById(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * 6. ADMIN: POST /api/admin/blogs
 * Creates a new article (draft or published)
 */
export declare function createAdminBlog(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * 7. ADMIN: PATCH /api/admin/blogs/:id
 * Updates article fields, status, or thumbnail
 */
export declare function updateAdminBlog(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * 8. ADMIN: DELETE /api/admin/blogs/:id
 * Deletes article and purges binary thumbnail
 */
export declare function deleteAdminBlog(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=blogController.d.ts.map
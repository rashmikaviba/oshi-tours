import { Router } from 'express';
import {
  getPublicBlogs,
  getPublicBlogBySlug,
  getBlogThumbnail,
  getAdminBlogs,
  getAdminBlogById,
  createAdminBlog,
  updateAdminBlog,
  deleteAdminBlog,
  uploadThumbnail,
} from '../controllers/blogController';
import { requireAdminAuth } from '../middleware/clerkAuth';

const router = Router();

// Public Routes
router.get('/blogs', getPublicBlogs);
router.get('/blogs/:slug', getPublicBlogBySlug);
router.get('/blogs/:slug/thumbnail', getBlogThumbnail);

// Admin Routes (Clerk Auth & Role Protected)
router.get('/admin/blogs', requireAdminAuth as any, getAdminBlogs as any);
router.get('/admin/blogs/:id', requireAdminAuth as any, getAdminBlogById as any);
router.post('/admin/blogs', requireAdminAuth as any, uploadThumbnail.single('thumbnail'), createAdminBlog as any);
router.patch('/admin/blogs/:id', requireAdminAuth as any, uploadThumbnail.single('thumbnail'), updateAdminBlog as any);
router.delete('/admin/blogs/:id', requireAdminAuth as any, deleteAdminBlog as any);

export default router;

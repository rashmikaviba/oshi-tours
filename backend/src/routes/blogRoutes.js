"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const clerkAuth_1 = require("../middleware/clerkAuth");
const router = (0, express_1.Router)();
// Public Routes
router.get('/blogs', blogController_1.getPublicBlogs);
router.get('/blogs/:slug', blogController_1.getPublicBlogBySlug);
router.get('/blogs/:slug/thumbnail', blogController_1.getBlogThumbnail);
// Admin Routes (Clerk Auth & Role Protected)
router.get('/admin/blogs', clerkAuth_1.requireAdminAuth, blogController_1.getAdminBlogs);
router.get('/admin/blogs/:id', clerkAuth_1.requireAdminAuth, blogController_1.getAdminBlogById);
router.post('/admin/blogs', clerkAuth_1.requireAdminAuth, blogController_1.uploadThumbnail.single('thumbnail'), blogController_1.createAdminBlog);
router.patch('/admin/blogs/:id', clerkAuth_1.requireAdminAuth, blogController_1.uploadThumbnail.single('thumbnail'), blogController_1.updateAdminBlog);
router.delete('/admin/blogs/:id', clerkAuth_1.requireAdminAuth, blogController_1.deleteAdminBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map
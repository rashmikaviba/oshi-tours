"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogArticle = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ThumbnailSchema = new mongoose_1.Schema({
    data: { type: Buffer, required: true },
    mimeType: { type: String, required: true, enum: ['image/jpeg', 'image/png'] },
    originalName: { type: String },
    size: { type: Number },
    altText: { type: String, required: true, default: '' },
}, { _id: false });
const BlogArticleSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    content: { type: String, required: true },
    status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft', index: true },
    thumbnail: { type: ThumbnailSchema, required: false },
    authorClerkUserId: { type: String, required: true },
    publishedAt: { type: Date, index: true },
}, {
    timestamps: true,
});
// Compound indexes for public listing queries
BlogArticleSchema.index({ status: 1, publishedAt: -1 });
exports.BlogArticle = mongoose_1.default.models.BlogArticle || mongoose_1.default.model('BlogArticle', BlogArticleSchema);
//# sourceMappingURL=BlogArticle.js.map
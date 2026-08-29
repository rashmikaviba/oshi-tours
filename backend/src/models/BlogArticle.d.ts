import { Document, Model } from 'mongoose';
export interface IThumbnail {
    data: Buffer;
    mimeType: 'image/jpeg' | 'image/png';
    originalName?: string | undefined;
    size?: number | undefined;
    altText: string;
}
export interface IBlogArticle extends Document {
    title: string;
    slug: string;
    content: string;
    status: 'draft' | 'published';
    thumbnail?: IThumbnail | null | undefined;
    authorClerkUserId: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date | undefined;
}
export declare const BlogArticle: Model<IBlogArticle>;
//# sourceMappingURL=BlogArticle.d.ts.map
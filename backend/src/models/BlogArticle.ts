import mongoose, { Schema, Document, Model } from 'mongoose';

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

const ThumbnailSchema = new Schema<IThumbnail>(
  {
    data: { type: Buffer, required: true },
    mimeType: { type: String, required: true, enum: ['image/jpeg', 'image/png'] },
    originalName: { type: String },
    size: { type: Number },
    altText: { type: String, required: true, default: '' },
  },
  { _id: false }
);

const BlogArticleSchema = new Schema<IBlogArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    content: { type: String, required: true },
    status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft', index: true },
    thumbnail: { type: ThumbnailSchema, required: false },
    authorClerkUserId: { type: String, required: true },
    publishedAt: { type: Date, index: true },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for public listing queries
BlogArticleSchema.index({ status: 1, publishedAt: -1 });

export const BlogArticle: Model<IBlogArticle> =
  mongoose.models.BlogArticle || mongoose.model<IBlogArticle>('BlogArticle', BlogArticleSchema);

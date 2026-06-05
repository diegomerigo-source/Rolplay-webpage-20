import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    content: { type: String, required: true },
    coverImage: { type: String, trim: true },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (v) => v.every((tag) => tag.length > 0 && tag.length <= 30),
        message: 'Each tag must be between 1 and 30 characters',
      },
    },
    published: { type: Boolean, default: true },
    source: { type: String, trim: true },
    views: { type: Number, default: 0, min: 0 },
    readingTime: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => { delete ret.__v; return ret; },
    },
    toObject: { virtuals: true },
  }
);

// slug unique index is created by field-level unique:true above
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });
blogSchema.index({ published: 1, createdAt: -1 });
blogSchema.index({ title: 'text', summary: 'text' });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

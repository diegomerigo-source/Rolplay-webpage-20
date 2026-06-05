import { z } from 'zod';

export const blogCreateSchema = z.object({
  title: z.string().min(3).max(200),
  summary: z.string().min(10).max(500),
  content: z.string().min(50),
  coverImage: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string().max(30)).optional().default([]),
  source: z.string().optional(),
  published: z.boolean().optional().default(true),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().optional(),
  tags: z.string().optional(),
});

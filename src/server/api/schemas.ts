import { z } from "zod";

export const createTrailSchema = z.object({
  name: z.string().min(1).max(256),
  description: z.string().optional(),
});

export const updateTrailSchema = z.object({
  name: z.string().min(1).max(256).optional(),
  description: z.string().optional(),
});

export const createItemSchema = z.object({
  trailId: z.number().int().positive(),
  name: z.string().min(1).max(256),
  description: z.string().optional(),
  xp: z.number().int().positive().default(10),
  order: z.number().int().nonnegative().default(0),
});

export const updateItemSchema = z.object({
  name: z.string().min(1).max(256).optional(),
  description: z.string().optional(),
  xp: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().optional(),
});

export type CreateTrailInput = z.infer<typeof createTrailSchema>;
export type UpdateTrailInput = z.infer<typeof updateTrailSchema>;
export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;


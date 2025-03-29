import { z } from "zod";

export const searchSchema = z.string().min(1).max(100);

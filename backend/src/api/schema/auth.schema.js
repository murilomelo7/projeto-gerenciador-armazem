import { z } from "zod";

export const loginSchema = z.object({
  usuario: z.string().min(1).max(256),
  senha: z.string().min(1).max(256),
});

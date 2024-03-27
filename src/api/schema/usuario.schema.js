import { z } from "zod";

export const createSchema = z.object({
  nome: z.string().min(1).max(30),
  email: z.string().email(),
  idade: z.number().int().min(1),
});

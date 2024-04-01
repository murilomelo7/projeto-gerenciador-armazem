import { z } from "zod";

export const createSchema = z.object({
  nome: z.string().min(1).max(128),
  descricao: z.string(),
});

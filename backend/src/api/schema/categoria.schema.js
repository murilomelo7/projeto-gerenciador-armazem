import { z } from "zod";

export const createSchema = z.object({
  empresa_id: z.number().min(1),
  nome: z.string().min(1).max(128),
  descricao: z.string(),
});

export const updateSchema = z.object({
  empresa_id: z.number().min(1),
  nome: z.string().min(1).max(128).optional(),
  descricao: z.string().optional(),
});

import { z } from "zod";

export const createSchema = z.object({
  empresa_id: z.number().min(1),
  nome: z.string().min(1).max(80),
  acessos: z.string().min(1).max(40),
});
export const updateSchema = z.object({
  empresa_id: z.number().min(1),
  nome: z.string().min(1).max(80),
  acessos: z.string().min(1).max(40),
});

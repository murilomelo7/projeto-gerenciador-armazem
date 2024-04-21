import { z } from "zod";

export const createSchema = z.object({
  nome: z.string().min(1).max(80),
  acessos: z.string().min(1).max(40),
});
export const updateSchema = z.object({
  nome: z.string().min(1).max(80),
  acessos: z.string().min(1).max(40),
});

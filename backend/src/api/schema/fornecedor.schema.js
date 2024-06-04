import { z } from 'zod';

export const createSchema = z.object({
  cpfCnpj: z.string().min(1).max(14),
  nome: z.string().min(1).max(80),
  telefone: z.string().min(1).max(80),
  email: z.string().min(5).max(100),
  observacao: z.string().optional(),
});

export const updateSchema = z.object({
  cpfCnpj: z.string().min(1).max(14),
  nome: z.string().min(1).max(80),
  telefone: z.string().min(1).max(80),
  email: z.string().min(5).max(100),
  observacao: z.string().optional(),
});

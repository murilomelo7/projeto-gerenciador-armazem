import { z } from 'zod';

export const entradaSchema = z.object({
  tipo: z.string().min(1).max(10),
  produto_id: z.number(),
  // fornecedor_id: z.number(),
  quantidade: z.number(),
});

export const saidaSchema = z.object({
  tipo: z.string().min(1).max(10),
  produto_id: z.number(),
  quantidade: z.number(),
});

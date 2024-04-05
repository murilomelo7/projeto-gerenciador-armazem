import { z } from "zod";

export const createSchema = z.object({
  nome: z.string().min(1).max(128),
  descricao: z.string().min(1).max(256),
  categoria_id: z.bigint(),
  quantidade_produto: z.bigint(),
  data_validade: z.date().nullable().optional(),
});

export const updateSchema = z.object({
  nome: z.string().min(1).max(128).optional(),
  descricao: z.string().min(1).max(256).optional(),
  categoria_id: z.bigint().optional(),
  quantidade_produto: z.bigint().optional(),
  data_validade: z.date().nullable().optional(),
});

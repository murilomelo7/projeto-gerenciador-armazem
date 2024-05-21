import { z } from "zod";

export const createSchema = z.object({
  nome: z.string().min(1).max(128),
  descricao: z.string().max(256),
  categoria_id: z.number(),
  quantidade_produto: z.number(),
  data_validade: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
});

export const updateSchema = z.object({
  nome: z.string().min(1).max(128).optional(),
  descricao: z.string().max(256).optional(),
  categoria_id: z.number().optional(),
  quantidade_produto: z.number().optional(),
  data_validade: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
});

export const entradaSchema = z.object({

});

export const saidaSchema = z.object({

});
import { z } from 'zod';

export const createSchema = z.object({
  codigo: z.string().min(1, { message: 'Código é obrigatório' }).max(60),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }).max(128),
  descricao: z.string().min(1, { message: 'Descrição é obrigatório' }).max(256),
  categoria_id: z.number({ message: 'Categoria é obrigatório' }),
  quantidade_produto: z.string().min(1, { message: 'Quantidade inicial é obrigatório' }),
  data_validade: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
});

export const updateSchema = z.object({
  codigo: z.string().min(1, { message: 'Código é obrigatório' }).max(60),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }).max(128).optional(),
  descricao: z.string().min(1, { message: 'Descrição é obrigatório' }).max(256).optional(),
  categoria_id: z.number().optional(),
  // quantidade_produto: z.number().optional(),
  data_validade: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable()
    .optional(),
});

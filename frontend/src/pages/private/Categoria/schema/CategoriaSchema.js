import { z } from 'zod';

export const createSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: 'Código é obrigatório' })
    .max(60, { message: 'Nome deve ter no máximo 60 caracteres' }),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }).max(128),
  descricao: z.string(),
});

export const updateSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: 'Código é obrigatório' })
    .max(60, { message: 'Código deve ter no máximo 60 caracteres' }),
  nome: z.string().min(1).max(128).optional(),
  descricao: z.string().optional(),
});

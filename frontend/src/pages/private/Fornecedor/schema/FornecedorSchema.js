import { z } from 'zod';

export const createSchema = z.object({
  cpfCnpj: z.string().min(1, { message: 'CPF/CNPJ é obrigatório' }).max(14),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }).max(80),
  telefone: z.string().min(1, { message: 'Telefone é obrigatório' }).max(80),
  email: z.string().min(5, { message: 'Email é obrigatório' }).max(100),
  observacao: z.string().optional(),
});

export const updateSchema = z.object({
  cpfCnpj: z.string().min(1, { message: 'CPF/CNPJ é obrigatório' }).max(14),
  nome: z.string().min(1, { message: 'Nome é obrigatório' }).max(80),
  telefone: z.string().min(1, { message: 'Telefone é obrigatório' }).max(80),
  email: z.string().min(5, { message: 'Email é obrigatório' }).max(100),
  observacao: z.string().optional(),
});

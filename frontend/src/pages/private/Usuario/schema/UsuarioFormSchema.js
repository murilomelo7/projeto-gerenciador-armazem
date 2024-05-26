import { z } from 'zod';

export const createSchema = z.object({
  nome: z.string().min(1).max(80),
  usuario: z.string().min(1).max(40),
  senha: z.string().min(3).max(256),
  email: z.string().email(),
  cpf: z.string().min(11).max(11),
  perfil_id: z.number().int().min(1),
  empresa_id: z.number().min(1),
});

export const updateSchema = z.object({
  nome: z.string().min(1).max(80),
  usuario: z.string().min(1).max(40),
  senha: z.string().min(1).max(256),
  email: z.string().email(),
  cpf: z.string().min(11).max(11),
  perfil_id: z.number().int().min(1),
  empresa_id: z.number().min(1),
});

import { z } from "zod";

export const createSchema = z.object({
  nome: z.string().min(1).max(80),
  usuario: z.string().min(1).max(40),
  senha: z.string().min(1).max(256),
  email: z.string().email(),
  idade: z.number().int().min(1),
  cpf: z.string().min(11).max(11),
  perfil_fk: z.number().int().min(1),
  empresa_fk: z.number().int().min(1),
});
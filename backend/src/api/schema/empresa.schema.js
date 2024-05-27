import { z } from "zod";

export const createSchema = z.object({
  tipo: z.string().min(1).max(1),
  cpfCnpj: z.string().min(11).max(14),
  nome: z.string().min(1).max(80),
  telefone: z.string().min(1).max(80),
  email: z.string().min(5).max(100),
  endereco: z.string().min(1).max(255),
  cidade: z.string().min(1).max(100),
  estado: z.string().min(2).max(2),
  cep: z.string().min(9).max(9),
  nomeUsuario: z.string().min(1).max(80),
  usuario: z.string().min(1).max(40),
  cpf: z.string().min(11).max(11),
  perfil_id: z.number().int().min(1),
  // observacoes: z.string(),
});
export const updateSchema = z.object({
  tipo: z.string().min(1).max(1),
  cpfCnpj: z.string().min(11).max(14),
  nome: z.string().min(1).max(80),
  telefone: z.string().min(1).max(80),
  email: z.string().min(5).max(100),
  endereco: z.string().min(1).max(255),
  cidade: z.string().min(1).max(100),
  estado: z.string().min(2).max(2),
  cep: z.string().min(9).max(9),
  // status: z.string().min(1).max(20),
  // observacoes: z.string(),
});

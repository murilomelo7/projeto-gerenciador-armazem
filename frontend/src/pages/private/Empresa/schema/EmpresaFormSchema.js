import { z } from 'zod';

export const createSchema = z.object({
  tipo: z.string().min(1, { message: 'Tipo é obrigatório' }).max(1, { message: 'Tipo deve ter no máximo 1 caractere' }),
  cpfCnpj: z
    .string()
    .min(11, { message: 'CPF/CNPJ deve ter no mínimo 11 caracteres' })
    .max(14, { message: 'CPF/CNPJ deve ter no máximo 14 caracteres' }),
  nome: z
    .string()
    .min(1, { message: 'Nome é obrigatório' })
    .max(80, { message: 'Nome deve ter no máximo 80 caracteres' }),
  telefone: z
    .string()
    .min(1, { message: 'Telefone é obrigatório' })
    .max(80, { message: 'Telefone deve ter no máximo 80 caracteres' }),
  email: z
    .string()
    .min(5, { message: 'Email deve ter no mínimo 5 caracteres' })
    .max(100, { message: 'Email deve ter no máximo 100 caracteres' })
    .email({ message: 'Email inválido' }),
  endereco: z
    .string()
    .min(1, { message: 'Endereço é obrigatório' })
    .max(255, { message: 'Endereço deve ter no máximo 255 caracteres' }),
  cidade: z
    .string()
    .min(1, { message: 'Cidade é obrigatória' })
    .max(100, { message: 'Cidade deve ter no máximo 100 caracteres' }),
  estado: z
    .string()
    .min(2, { message: 'Estado deve ter 2 caracteres' })
    .max(2, { message: 'Estado deve ter 2 caracteres' }),
  cep: z.string().min(9, { message: 'CEP deve ter 9 caracteres' }).max(9, { message: 'CEP deve ter 9 caracteres' }),
  nomeUsuario: z.string().min(1).max(80),
  usuario: z.string().min(1).max(40),
  cpf: z.string().min(11).max(11),
  perfil_id: z.number().int().min(1),
});
export const updateSchema = z.object({
  tipo: z.string().min(1, { message: 'Tipo é obrigatório' }).max(1, { message: 'Tipo deve ter no máximo 1 caractere' }),
  cpfCnpj: z
    .string()
    .min(11, { message: 'CPF/CNPJ deve ter no mínimo 11 caracteres' })
    .max(14, { message: 'CPF/CNPJ deve ter no máximo 14 caracteres' }),
  nome: z
    .string()
    .min(1, { message: 'Nome é obrigatório' })
    .max(80, { message: 'Nome deve ter no máximo 80 caracteres' }),
  telefone: z
    .string()
    .min(1, { message: 'Telefone é obrigatório' })
    .max(80, { message: 'Telefone deve ter no máximo 80 caracteres' }),
  email: z
    .string()
    .min(5, { message: 'Email deve ter no mínimo 5 caracteres' })
    .max(100, { message: 'Email deve ter no máximo 100 caracteres' })
    .email({ message: 'Email inválido' }),
  endereco: z
    .string()
    .min(1, { message: 'Endereço é obrigatório' })
    .max(255, { message: 'Endereço deve ter no máximo 255 caracteres' }),
  cidade: z
    .string()
    .min(1, { message: 'Cidade é obrigatória' })
    .max(100, { message: 'Cidade deve ter no máximo 100 caracteres' }),
  estado: z
    .string()
    .min(2, { message: 'Estado deve ter 2 caracteres' })
    .max(2, { message: 'Estado deve ter 2 caracteres' }),
  cep: z.string().min(9, { message: 'CEP deve ter 9 caracteres' }).max(9, { message: 'CEP deve ter 9 caracteres' }),
});

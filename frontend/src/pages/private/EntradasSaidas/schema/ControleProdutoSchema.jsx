import { z } from 'zod';

export const entradaSchema = z.object({
  tipo: z.string().min(1).max(10),
  produto_id: z.number({ message: 'Produto é obrigatório' }),
  fornecedor_id: z.number({ message: 'Fornecedor é obrigatório' }),
  quantidade: z.string().min(1, { message: 'Quantidade é obrigatória' }),
  valor_unidade: z.string().min(1, { message: 'Valor unitário é obrigatória' }),

});

export const saidaSchema = z.object({
  tipo: z.string().min(1).max(10),
  produto_id: z.number({ message: 'Produto é obrigatório' }),
  quantidade: z.string().min(1, { message: 'Quantidade é obrigatória' }),
  valor_unidade: z.string().min(1, { message: 'Valor unitário é obrigatória' }),
});

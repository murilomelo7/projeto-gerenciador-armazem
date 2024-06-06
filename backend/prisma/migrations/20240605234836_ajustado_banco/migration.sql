/*
  Warnings:

  - Made the column `created_at` on table `categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `empresa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `perfil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `produto` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "usuario_token_key";

-- AlterTable
ALTER TABLE "categoria" ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "codigo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "controle_produto" ALTER COLUMN "tipo" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "empresa" ALTER COLUMN "tipo" SET DATA TYPE TEXT,
ALTER COLUMN "cpf_cnpj" SET DATA TYPE TEXT,
ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "telefone" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "endereco" SET DATA TYPE TEXT,
ALTER COLUMN "cidade" SET DATA TYPE TEXT,
ALTER COLUMN "estado" SET DATA TYPE TEXT,
ALTER COLUMN "cep" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "fornecedor" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "perfil" ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "acessos" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "codigo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "produto" ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "descricao" SET DATA TYPE TEXT,
ALTER COLUMN "data_validade" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "codigo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "usuario" SET DATA TYPE TEXT,
ALTER COLUMN "senha" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "cpf" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "token" SET DATA TYPE TEXT;

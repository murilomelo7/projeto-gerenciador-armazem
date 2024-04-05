/*
  Warnings:

  - You are about to alter the column `quantidade` on the `entrada_produto` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saida_produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "entrada_produto" DROP CONSTRAINT "entrada_produto_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "saida_produto" DROP CONSTRAINT "saida_produto_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "usuario" DROP CONSTRAINT "usuario_empresa_id_fkey";

-- AlterTable
ALTER TABLE "entrada_produto" ALTER COLUMN "quantidade" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "categoria";

-- DropTable
DROP TABLE "empresa";

-- DropTable
DROP TABLE "produto";

-- DropTable
DROP TABLE "saida_produto";

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(128) NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(128) NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "descricao" VARCHAR(256),
    "quantidade_produto" INTEGER NOT NULL,
    "data_validade" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaidaProduto" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_saida" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaidaProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(1) NOT NULL,
    "cpf_cnpj" VARCHAR(14) NOT NULL,
    "nome" VARCHAR(80) NOT NULL,
    "telefone" VARCHAR(20),
    "email" VARCHAR(100),
    "endereco" VARCHAR(255),
    "cidade" VARCHAR(100),
    "estado" VARCHAR(2),
    "cep" VARCHAR(8),
    "status" VARCHAR(20) NOT NULL DEFAULT 'ativo',
    "observacoes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrada_produto" ADD CONSTRAINT "entrada_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaidaProduto" ADD CONSTRAINT "SaidaProduto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

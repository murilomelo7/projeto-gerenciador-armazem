/*
  Warnings:

  - You are about to drop the `entrada_produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saida_produto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codigo` to the `categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `perfil` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "entrada_produto" DROP CONSTRAINT "entrada_produto_empresa_id_fkey";

-- DropForeignKey
ALTER TABLE "entrada_produto" DROP CONSTRAINT "entrada_produto_produto_id_fkey";

-- DropForeignKey
ALTER TABLE "saida_produto" DROP CONSTRAINT "saida_produto_empresa_id_fkey";

-- DropForeignKey
ALTER TABLE "saida_produto" DROP CONSTRAINT "saida_produto_produto_id_fkey";

-- AlterTable
ALTER TABLE "categoria" ADD COLUMN     "codigo" VARCHAR(60) NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "empresa" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "perfil" ADD COLUMN     "codigo" VARCHAR(60) NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "codigo" VARCHAR(60) NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "updated_at" DROP DEFAULT;

-- DropTable
DROP TABLE "entrada_produto";

-- DropTable
DROP TABLE "saida_produto";

-- CreateTable
CREATE TABLE "controle_produto" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(128) NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "data_entrada" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "controle_produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "controle_produto" ADD CONSTRAINT "controle_produto_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "controle_produto" ADD CONSTRAINT "controle_produto_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

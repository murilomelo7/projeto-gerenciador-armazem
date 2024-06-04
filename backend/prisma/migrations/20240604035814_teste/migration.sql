/*
  Warnings:

  - Made the column `fornecedor_id` on table `controle_produto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "controle_produto" DROP CONSTRAINT "controle_produto_fornecedor_id_fkey";

-- AlterTable
ALTER TABLE "controle_produto" ALTER COLUMN "fornecedor_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "controle_produto" ADD CONSTRAINT "controle_produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

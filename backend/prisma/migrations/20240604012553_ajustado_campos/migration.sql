/*
  Warnings:

  - You are about to drop the column `cnpj` on the `fornecedor` table. All the data in the column will be lost.
  - Added the required column `fornecedor_id` to the `controle_produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpfCnpj` to the `fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "controle_produto" ADD COLUMN     "fornecedor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "fornecedor" DROP COLUMN "cnpj",
ADD COLUMN     "cpfCnpj" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "controle_produto" ADD CONSTRAINT "controle_produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

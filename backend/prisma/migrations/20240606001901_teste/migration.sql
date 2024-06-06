-- DropForeignKey
ALTER TABLE "controle_produto" DROP CONSTRAINT "controle_produto_fornecedor_id_fkey";

-- AlterTable
ALTER TABLE "controle_produto" ALTER COLUMN "fornecedor_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "controle_produto" ADD CONSTRAINT "controle_produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

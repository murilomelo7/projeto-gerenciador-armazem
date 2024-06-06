-- AlterTable
ALTER TABLE "controle_produto" ADD COLUMN     "data_estorno" TIMESTAMP(3),
ADD COLUMN     "valor_total" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "valor_unidade" DECIMAL(65,30) NOT NULL DEFAULT 0;

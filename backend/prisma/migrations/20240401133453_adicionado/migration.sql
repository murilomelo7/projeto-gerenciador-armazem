/*
  Warnings:

  - Added the required column `descricao` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categoria" ADD COLUMN     "descricao" TEXT NOT NULL;

/*
  Warnings:

  - A unique constraint covering the columns `[departamento]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departamento" CHAR(40);

-- CreateIndex
CREATE UNIQUE INDEX "User_departamento_key" ON "User"("departamento");

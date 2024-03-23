/*
  Warnings:

  - The primary key for the `Equipamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Equipamento` table. All the data in the column will be lost.
  - You are about to alter the column `descricao` on the `Equipamento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `emailUser` to the `Equipamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Equipamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipamento" DROP CONSTRAINT "Equipamento_pkey",
DROP COLUMN "id",
DROP COLUMN "nome",
ADD COLUMN     "emailUser" VARCHAR(40) NOT NULL,
ADD COLUMN     "idEquipamento" SERIAL NOT NULL,
ADD COLUMN     "tipo" VARCHAR(40) NOT NULL,
ALTER COLUMN "descricao" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("idEquipamento");

-- AddForeignKey
ALTER TABLE "Equipamento" ADD CONSTRAINT "Equipamento_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("emailUser") ON DELETE RESTRICT ON UPDATE CASCADE;

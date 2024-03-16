/*
  Warnings:

  - You are about to drop the column `status` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `statusAgendamento` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "status",
ADD COLUMN     "statusAgendamento" VARCHAR(12) NOT NULL;

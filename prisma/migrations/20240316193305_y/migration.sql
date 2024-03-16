-- CreateTable
CREATE TABLE "Schedule" (
    "idAgendamento" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dataHorario" TIMESTAMP NOT NULL,
    "emailUser" VARCHAR(40) NOT NULL,
    "observacoes" VARCHAR(100),
    "status" VARCHAR(12) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("idAgendamento")
);

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("emailUser") ON DELETE RESTRICT ON UPDATE CASCADE;

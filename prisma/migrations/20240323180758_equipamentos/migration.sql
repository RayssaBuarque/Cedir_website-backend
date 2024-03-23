-- CreateTable
CREATE TABLE "Equipamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,

    CONSTRAINT "Equipamento_pkey" PRIMARY KEY ("id")
);

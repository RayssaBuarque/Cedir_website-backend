-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "nomeUser" VARCHAR(120) NOT NULL,
    "nomeEmpresa" VARCHAR(120),
    "emailUser" VARCHAR(40) NOT NULL,
    "cpfUser" CHAR(11) NOT NULL,
    "cnpjEmpresa" CHAR(14),

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailUser_key" ON "User"("emailUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfUser_key" ON "User"("cpfUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpjEmpresa_key" ON "User"("cnpjEmpresa");

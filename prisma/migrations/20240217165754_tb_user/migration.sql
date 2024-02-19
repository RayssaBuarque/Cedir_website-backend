-- CreateTable
CREATE TABLE "User" (
    "idUser" integer NOT NULL DEFAULT nextval('"User_idUser_seq"'::regclass),
    "nomeUser" character varying(120) COLLATE pg_catalog."default" NOT NULL,
    "nomeEmpresa" character varying(120) COLLATE pg_catalog."default",
    "emailUser" character varying(40) COLLATE pg_catalog."default" NOT NULL,
    "cpfUser" character(11) COLLATE pg_catalog."default" NOT NULL,
    "cnpjEmpresa" character(14) COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser"),
    CONSTRAINT "unique" UNIQUE ("cpfUser", "cnpjEmpresa", "emailUser")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailUser_key" ON "User"("emailUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpfUser_key" ON "User"("cpfUser");

-- CreateIndex
CREATE UNIQUE INDEX "User_cnpjEmpresa_key" ON "User"("cnpjEmpresa");

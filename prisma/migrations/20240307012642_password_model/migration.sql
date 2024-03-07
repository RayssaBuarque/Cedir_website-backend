-- CreateTable
CREATE TABLE "Password" (
    "emailUser" VARCHAR(40) NOT NULL,
    "senha" VARCHAR(40) NOT NULL,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("emailUser")
);

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_emailUser_fkey" FOREIGN KEY ("emailUser") REFERENCES "User"("emailUser") ON DELETE RESTRICT ON UPDATE CASCADE;

const express = require("express");

const readPassword = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
    Read route for password table
*/
readPassword.get("/password/:emailUser", async (request, response) => {
    const {emailUser} = request.params;

    try{
        const password = await prisma.password.findFirst({
            where:{
                emailUser : emailUser,
            }
        }).then((password) => {
            let existencia = (password !== null)

            let validacaoLogin = {
                existencia: existencia,
                email: emailUser
            }
            return response.status(200).json(validacaoLogin);
        });
    } catch(error){ console.log(error) }
        
});

module.exports = readPassword;
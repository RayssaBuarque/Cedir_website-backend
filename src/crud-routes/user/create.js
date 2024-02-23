const express = require("express");

const createUser = express.Router(); // roteador crud
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // função responsável por envios e recebimentos do banco

/*
    Create route for user table
*/
createUser.post("/user", async (request, response) => {
    if('cnpjEmpresa' in request.body){ // Cadastro de Pessoa Jurídica
        const {nomeUser, nomeEmpresa, cpfUser, cnpjEmpresa, emailUser} = request.body; 

        try{ 
            const user = await prisma.user.create({
                data:{
                    nomeUser,
                    nomeEmpresa,
                    cpfUser,
                    cnpjEmpresa,
                    emailUser,
                },
            });
            return response.status(201).json(user);
        }catch(error){ console.error(error) }

    }else{ // cadastro de Pessoa Física
        const {nomeUser, cpfUser, emailUser} = request.body; 

        try{
            const user = await prisma.user.create({
                data:{
                    nomeUser,
                    cpfUser,
                    emailUser,
                },
            });
            return response.status(201).json(user);
        }catch(error){ console.error(error) }
    }
});

module.exports = createUser;
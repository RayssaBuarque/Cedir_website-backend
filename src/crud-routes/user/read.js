const express = require("express");

const readUser = express.Router(); 
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); 

/*
    Read route for user table
*/
readUser.get("/user/:userDocument", async (req,res) => {
    const {userDocument} = req.params;
    
    try{
        if(userDocument.length == 11){ // Coleta de PESSOA FÍSICA
            const user = await prisma.user.findFirst({
                where:{
                    cpfUser : userDocument,
                }
            });
            return res.status(200).json(user);
        }

        else if(userDocument.length == 14){ // COLETA DE PESSOA JURÍDICA
            const user = await prisma.user.findFirst({
                where:{
                    cnpjEmpresa : userDocument,
                }
            });
            return res.status(200).json(user);
        }
    }catch(error){console.log(error)}

});

readUser.get("/user", async (req,res) => {
    try{
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }catch(error){ console.error(error) }
});

module.exports = readUser;
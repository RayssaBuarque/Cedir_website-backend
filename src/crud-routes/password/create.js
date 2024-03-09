const express = require("express");

const createPassword = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
    Create route for password table
*/
createPassword.post("/password", async (request, response) => {
    const {emailUser, senha} = request.body; 

    const password = await prisma.password.create({
        data:{
            emailUser,
            senha,
        },
    }).then( (password) => {
        return response.status(201).json(password)
    })
        
    // const password = createUserPJ(emailUser, senha)
        
});

module.exports = createPassword;
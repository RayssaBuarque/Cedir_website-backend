const express = require("express");

const createUser = express.Router(); // roteador crud
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient(); // função responsável por envios e recebimentos do banco

/*
    Create route for user table
*/
createUser.post("/userPF", async (request, response) => {
    const {nomeUser, cpfUser, emailUser} = request.body; 

    const user = await prisma.user.create({
        data:{
            nomeUser,
            cpfUser,
            emailUser,
        },
    });
    return response.status(201).json(user);
});


module.exports = createUser;
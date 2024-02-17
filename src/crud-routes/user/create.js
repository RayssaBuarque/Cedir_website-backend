const express = require("express");

const createUser = express.Router(); // roteador crud
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient(); // função responsável por envios e recebimentos do banco

/*
    Create route for user table
*/
createUser.post('/user', async (req, res) => {
    const {nome, cpf, email} = req.body; 

    const user = await prisma.user.create({
        data:{
            nome,
            cpf,
            email,
        },
    });
    return res.status(201).json(user);
});


module.exports = createUser;
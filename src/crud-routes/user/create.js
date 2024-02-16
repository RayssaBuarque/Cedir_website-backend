const express = require("express");

const createUser = express.Router();
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

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
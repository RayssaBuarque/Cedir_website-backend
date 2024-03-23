const express = require("express");

const updatePassword = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

updatePassword.put('/password', async (req,res) => {
    const {emailUser, senha} = req.body;

    const password = await prisma.password.update({
        where:{
            emailUser,
        },
        data:{
            senha,
        },
    })

    return res.status(200).json(password)
})

module.exports = updatePassword;
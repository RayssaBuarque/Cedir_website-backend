const express = require("express");

const createUser = express.Router(); // roteador crud
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient(); // função responsável por envios e recebimentos do banco

/*
    Create route for user table
*/
createUser.post("/userPF", async (req, res) => {
    const {nomeUser, cpfUser, emailUser} = req.body; 

    const user = await prisma.user.create({
        data:{
            nomeUser,
            cpfUser,
            emailUser,
        },
    });
    return res.status(201).json(user);

    // } catch (error) {
    //     console.error("Erro ao criar usuário:", error);
    //     return res.status(500).json({ error: "Erro interno ao criar usuário" });
    // }
});


module.exports = createUser;
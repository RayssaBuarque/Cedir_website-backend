const express = require("express");

const createEquipamento= express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
    Create route for password table
*/
createEquipamento.post("/equipamento", async (request, response) => {
    const {tipo, descricao, qtd, emailUser} = request.body; 

    const equipamento = await prisma.equipamento.create({
        data:{
            tipo,
            descricao,
            qtd,
            emailUser
        },
    }).then( (equipamento) => {
        return response.status(201).json(equipamento)
    })
        
});

module.exports = createEquipamento;
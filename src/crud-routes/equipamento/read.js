const express = require("express");

const readEquipamento = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
    Read route for password table
*/
readEquipamento.get("/equipamento/:idEquipamento", async (request, response) => {
    const {idEquipamento} = request.params;

    try{
        const equipamento = await prisma.equipamento.findFirst({
            where:{
                idEquipamento : Number(idEquipamento),
            }
        }).then((equipamento) => {
            let existencia = (equipamento !== null)
            return response.status(200).json(equipamento);
        });
    } catch(error){console.log(error) }
        
});

module.exports = readEquipamento;
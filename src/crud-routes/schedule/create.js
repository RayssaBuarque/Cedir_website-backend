const express = require("express");

const createSchedule = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
    Create route for password table
*/
createSchedule.post("/schedule", async (request, response) => {
    const {dataAgendamento, periodo, emailUser, observacoes} = request.body; 

    // const [hours, minutes] = dataHorario.split(':').map(Number);
    // const isoString = `${dataAgendamento}T${hours < 10 ? '0' + hours : hours}:${minutes}:00.000Z`;
    // const isoString = `${dataAgendamento}T01:00:00.000Z`;
    const isoString = `2023-12-12T01:00:00.000Z`;

    const statusAgendamento = "Pendente";
    const createdAt = new Date();
    const updatedAt = new Date();

    const schedule = await prisma.schedule.create({
        data:{
            dataAgendamento:isoString,
            emailUser:emailUser,
            observacoes:observacoes,
            statusAgendamento:statusAgendamento,
            periodo:periodo,
            createdAt:createdAt,
            updatedAt:updatedAt,
        },

    }).then( (schedule) => {
        return response.status(201).json(schedule)
    })
        
    // const password = createUserPJ(emailUser, senha)
});

module.exports = createSchedule;
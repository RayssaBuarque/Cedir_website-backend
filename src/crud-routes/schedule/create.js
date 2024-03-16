const express = require("express");

const createSchedule = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
    Create route for password table
*/
createSchedule.post("/schedule", async (request, response) => {
    const {dataAgendamento, dataHorario, emailUser, observacoes} = request.body; 
    
    const [dia, mes, ano] = dataAgendamento.split('/');
    const [hours, minutes, seconds] = dataHorario.split(':').map(Number);
    const isoString = `${ano}-${mes}-${dia}T${hours}:${minutes}:${seconds}Z`;

    const statusAgendamento = "Pendente";
    const createdAt = new Date();
    const updatedAt = new Date();

    const schedule = await prisma.schedule.create({
        data:{
            dataAgendamento:isoString,
            emailUser:emailUser,
            observacoes:observacoes,
            statusAgendamento:statusAgendamento,
            createdAt:createdAt,
            updatedAt:updatedAt,
        },

    }).then( (schedule) => {
        return response.status(201).json(schedule)
    })
        
    // const password = createUserPJ(emailUser, senha)
});

module.exports = createSchedule;
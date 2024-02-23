const express = require("express");

const createUser = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function checarExistencia(cpfUser, emailUser){
    try{
        let existencia = false;

        const checagemCpf = await prisma.user.findUnique({ where: { cpfUser : cpfUser} })
            .then((check) => {
                existencia = (existencia == true)? true: !!check;
            })
        const checagemEmail = await prisma.user.findUnique({ where: { emailUser : emailUser} })
            .then((check) => {
                existencia = (existencia == true)? true: !!check;
            })
        
        return existencia;
    }catch(error){console.log(error)}
}
async function createUserPJ(nomeUser, nomeEmpresa, cpfUser, cnpjEmpresa, emailUser) {
    try{ 
        const checagem = await checarExistencia(cpfUser, emailUser);

        if(!!checagem){
            return({mensagem: "Usuário já cadastrado"})
        }else{
            const user = await prisma.user.create({
                data:{
                    nomeUser,
                    nomeEmpresa,
                    cpfUser,
                    cnpjEmpresa,
                    emailUser,
                },
            });
            return user;
        }
    }catch(error){ console.error(error) }
}
async function createUserPF(nomeUser, cpfUser, emailUser){
    try{
        const checagem = await checarExistencia(cpfUser, emailUser);

        if(!!checagem){
            return({mensagem: "Usuário já cadastrado"})
        }else{
            const user = await prisma.user.create({
                data:{
                    nomeUser,
                    cpfUser,
                    emailUser,
                },
            });
            return user;
        }
    }catch(error){ console.error(error) }
}

/*
    Create route for user table
*/
createUser.post("/user", async (request, response) => {

    if('cnpjEmpresa' in request.body){ // Cadastro de Pessoa Jurídica
        const {nomeUser, nomeEmpresa, cpfUser, cnpjEmpresa, emailUser} = request.body; 
        
        const user = createUserPJ(nomeUser, nomeEmpresa, cpfUser, cnpjEmpresa, emailUser)
            .then( (user) => {
                return response.status(201).json(user)
            })
    }
    
    else{ // cadastro de Pessoa Física
        const {nomeUser, cpfUser, emailUser} = request.body; 

        const user = createUserPF(nomeUser, cpfUser, emailUser)
            .then((user) => {
                return response.status(201).json(user)
            });
    }
});

module.exports = createUser;
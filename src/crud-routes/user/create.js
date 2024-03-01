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
async function checarCpf(cpfUser){
    const validaPrimeiroDigito = (cpf) => { // Calcula e verifica se o primeiro dígito verificador do CPF é válido.
        let soma = 0;
        let multiplicador = 10;
    
        for (let tamanho = 0; tamanho < 9; tamanho++) {
          soma += parseInt(cpf[tamanho]) * multiplicador;
          multiplicador--;
        }
    
        soma = (soma * 10) % 11;
    
        if (soma === 10 || soma === 11) {
          soma = 0;
        }
    
        return soma !== parseInt(cpf[9]);
      };
    const validaSegundoDigito = (cpf) => { // Calcula e verifica se o segundo dígito verificador do CPF é válido.
        let soma = 0;
        let multiplicador = 11;
    
        for (let tamanho = 0; tamanho < 10; tamanho++) {
          soma += parseInt(cpf[tamanho]) * multiplicador;
          multiplicador--;
        }
    
        soma = (soma * 10) % 11;
    
        if (soma === 10 || soma === 11) {
          soma = 0;
        }
    
        return soma !== parseInt(cpf[10]);
      };
    const validaNumerosRepetidos = (cpf) => {
        const numerosRepetidos = [ // Verifica se o cpf tem uma sequencia de n repetidos
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999'
        ];
    
        return numerosRepetidos.includes(cpf); // Retorna true se repetido, false caso contrário.
        //includes = verifica se em (cpf), há algum cpf presente em numerosRepetidos 
      };

      if (validaNumerosRepetidos(cpfUser) || validaPrimeiroDigito(cpfUser) || validaSegundoDigito(cpfUser)) { // || =  retorna verdadeiro caso ambos os operandos sejam verdadeiro, e se for falso, retorna falso.
        return true
      } else {
        return false
      }
}
async function createUserPJ(nomeUser, nomeEmpresa, cpfUser, cnpjEmpresa, emailUser) {
    try{ 
        const checagem = await checarExistencia(cpfUser, emailUser);

        if(campos.some(item => item === "")){
            return({mensagem: "Preencha todos os campos"})
        }else if(!!checagem){
            return({mensagem: "Usuário já cadastrado"})
        // }else if(){ 
            // CONDIÇÃO DA API DO CNPJ
        
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
        const campos = [nomeUser, cpfUser, emailUser]
        const checagemUsuario = await checarExistencia(cpfUser, emailUser);
        const checagemCpf = await checarCpf(cpfUser);

        if(campos.some(item => item === "")){
            return({mensagem: "Preencha todos os campos"})
        }else if(!!checagemUsuario){
            return({mensagem: "Usuário já cadastrado"})
        }else if(!!checagemCpf){ 
            return({mensagem: "CPF inválido"})
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
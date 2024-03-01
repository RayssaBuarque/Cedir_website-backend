const express = require("express");

const createUser = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// INÍCIO DAS CHECAGENS 

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
async function checarCnpj(cnpjEmpresa){
    const validaNumerosRepetidosCNPJ = (cnpj) => { // Verifica se o CNPJ possui uma sequência de dígitos repetidos.
        const numerosRepetidos = [
          '00000000000000',
          '11111111111111',
          '22222222222222',
          '33333333333333',
          '44444444444444',
          '55555555555555',
          '66666666666666',
          '77777777777777',
          '88888888888888',
          '99999999999999'
        ];
    
        return numerosRepetidos.includes(cnpj); 
      };
      const validaDigitosVerificadoresCNPJ = (cnpj) => { // Calcula e verifica se os dígitos verificadores do CNPJ são válidos.
        const calculaDigito = (cnpj, posicao) => {
          let soma = 0;
          let multiplicador = posicao === 12 ? 2 : 9;
    
          for (let i = 0; i < posicao; i++) {
            soma += parseInt(cnpj[i]) * multiplicador;
            multiplicador--;
    
            if (multiplicador === 1) {
              multiplicador = 9;
            }
          }
    
          const resultado = soma % 11;
          return resultado < 2 ? 0 : 11 - resultado;
        };
    
        const digito1 = calculaDigito(cnpj, 12);
        const digito2 = calculaDigito(cnpj, 13);
    
        return parseInt(cnpj[12]) === digito1 && parseInt(cnpj[13]) === digito2;
      };
      if (!validaNumerosRepetidosCNPJ(cnpjEmpresa) && validaDigitosVerificadoresCNPJ(cnpjEmpresa)) { // Se todas retornarem verdadeiro, imprime "CNPJ válido"; caso contrário, imprime "CNPJ inválido".
        return false
      } else {
        return true
      }
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

// FIM DAS CHECAGENS

async function createUserPJ(nomeUser, nomeEmpresa, cpfUser, cnpjEmpresa, emailUser) {
    try{ 
        const campos = [nomeUser, cpfUser, emailUser, cnpjEmpresa, nomeEmpresa]
        const checagemUser = await checarExistencia(cpfUser, emailUser);
        const checagemCpnj = await checarCnpj(cnpjEmpresa);
        const checagemCpf = await checarCpf(cpfUser);

        if(campos.some(item => item === "")){
            return({mensagem: "Preencha todos os campos"});
        }else if(!!checagemUser){
            return({mensagem: "Usuário já cadastrado"});
        }else if(!!checagemCpf){ 
            return({mensagem: "CPF inválido"})
        }else if(!!checagemCpnj){ 
            return({mensagem: "CNPJ inválido"})
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
        // CONEXÃO DAS CHECAGENS
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
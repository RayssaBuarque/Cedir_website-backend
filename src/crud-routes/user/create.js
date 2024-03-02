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

async function checarEmail(emailUser){
  // Expressão regular para validar o formato do e-mail
  const regexEmail = /^[a-zA-Z0-9._-]{1,25}@[a-zA-Z0-9-]{1,14}\.[a-zA-Z0-9.]{2,}$/;
  return regexEmail.test(emailUser);

}   

async function checarCnpj(cnpjEmpresa) {
    // Remover caracteres não numéricos
    const cnpj = cnpjEmpresa.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14) {
        return false;
    }

    // Verificar se todos os dígitos são iguais (situação inválida)
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Calcular o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 12; i++) {
        soma += parseInt(cnpj.charAt(i)) * (13 - i);
    }
    let resto = (soma % 11);
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    // Verificar o primeiro dígito verificador
    if (parseInt(cnpj.charAt(12)) !== digitoVerificador1) {
        return false;
    }

    // Calcular o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 13; i++) {
        soma += parseInt(cnpj.charAt(i)) * (14 - i);
    }
    resto = (soma % 11);
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

    // Verificar o segundo dígito verificador
    if (parseInt(cnpj.charAt(13)) !== digitoVerificador2) {
        return false;
    }

    // Se todas as verificações passaram, o CNPJ é válido
    return true;
}

async function checarCpf(cpfUser){
    const cpfNumerico = cpfUser.replace(/[^\d]/g, ''); // Remove todos os caracteres não numéricos
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

      if (validaNumerosRepetidos(cpfNumerico) || validaPrimeiroDigito(cpfNumerico) || validaSegundoDigito(cpfNumerico)) { // || =  retorna verdadeiro caso ambos os operandos sejam verdadeiro, e se for falso, retorna falso.
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
        const checagemCnpj = await checarCnpj(cnpjEmpresa);
        const checagemCpf = await checarCpf(cpfUser);
        const checagemEmail = await checarEmail(emailUser);

        if(campos.some(item => item === "")){
            return({mensagem: "Preencha todos os campos"});
        }else if(!!checagemUser){
            return({mensagem: "Usuário já cadastrado"});
        }else if(!!checagemCnpj){ 
            return({mensagem: "CNPJ inválido"})
        }else if(!checagemEmail){
            return({mensagem: "Email inválido"});
        }else if(!!checagemCpf){ 
            return({mensagem: "CPF inválido"})
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

        if(campos.some(item => item === "")){
            return({mensagem: "Preencha todos os campos"})
        }else if(!!checagemUsuario){
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
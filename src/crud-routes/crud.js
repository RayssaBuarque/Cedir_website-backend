const {createUser, readUser} = require('./user/crudUser');
const {createPassword, readPassword, updatePassword} = require('./password/crudPassword');
const createSchedule = require('./schedule/crudSchedule');
// Conforme criarmos outras tabelas e Routes, importaremos aqui


module.exports = {createUser, readUser, createPassword, readPassword, updatePassword, createSchedule};
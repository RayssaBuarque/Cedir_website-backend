const express = require("express");

const readUser = express.Router(); 
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); 

/*
    Read route for user table
*/
readUser.get("/user", async (req,res) => {
    try{
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    }catch(error){ console.error(error) }
});

module.exports = readUser;
const express = require("express")
const cors = require("cors");

const {createUser, readUser} = require('./crud-routes/crud'); //será necessário colocar cada um dos itens aqui
const app = express();

app.use(express.json())
app.use(cors());

app.use(createUser); //será necessário colocar cada um dos itens aqui
app.use(readUser);

// checar se o servidor está funcionando
app.get("/health13122005", (req,res) => {
    return res.json("server is up and runnin'");
});

app.listen(3333, () => console.log('Server is up in 3333'))
const express = require("express")
const cors = require("cors");
const app = express();

app.use(express.json())
app.use(cors());

// checar se o servidor está funcionando
app.get("/health13122005", (req,res) => {
    return res.json("server is up and runnin'");
});


app.listen(3333, () => console.log('Server is up in 3333'))
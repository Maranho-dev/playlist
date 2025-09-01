const express = require("express");
const router = require("./routes");
const app = express();
const playController = require("./controller/Controller");

// ESSENCIAL: para ler JSON do corpo das requisições
app.use(express.json());

app.use(router);

// Para URL-encoded (formulários)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ text: "hello world" });
});
app.get("/playlist", playController.index);
app.get("/playlist/:id", playController.show);
app.post("/playlist/create", playController.create);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`servidor iniciado:http://localhost:${PORT}/`);
});

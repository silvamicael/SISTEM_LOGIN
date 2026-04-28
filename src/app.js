import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";

import "./models/user.model.js";

import routerAuth from "./router/auth.routes.js";
import routerUser from "./router/user.router.js";

const app = express();

// Permite qualquer origem em desenvolvimento
// Em produção, substitua "*" pela URL do front-end
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Rotas
app.use("/auth", routerAuth);
app.use("/usuario", routerUser);

// Inicialização do servidor
sequelize.sync({ alter: true })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `Servidor iniciado em http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(
            "Erro ao sincronizar ou iniciar o servidor:",
            err
        );
    });
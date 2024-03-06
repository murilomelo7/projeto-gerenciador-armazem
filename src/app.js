import express from "express";

import routes from "./api/routes";

const app = express();

//---------------------------------------------------------------------------
// ! Rota para verificar o status da api
app.get("/status", (req, res) =>
  res
    .status(200)
    .json({ message: "Server ok!", version: "easydots-esocial v1.0.0" })
);

//---------------------------------------------------------------------------
// ! Rotas personalizadas
app.use(routes);

//---------------------------------------------------------------------------
// ! 404 NOT FOUND
app.use((req, res, next) => {
  console.log(`Requisição para ${req.originalUrl} não encontrada`);
  res.status(404).send("Página não encontrada");
});

//---------------------------------------------------------------------------
// ! TRATAMENTO DE ERROS DO SISTEMA
app.use((err, req, res, next) => {
  const { query, params, body, originalUrl } = req;
  const { statusCode, message, data } = err;
  console.log(err);

  const host = req.get("host");
  const { protocol, url, method } = req;

  console.log(`Failed endpoint ${method} ${protocol}://${host}${url}`);
  console.error(err.message, err.stack);

  res.status(statusCode || 500).json({ message, data });
});

export default app;

import express from "express";

import { TesteController } from "../controllers";

const router = express.Router();

const testeController = new TesteController();

router.get("/", testeController.teste);

export default router;

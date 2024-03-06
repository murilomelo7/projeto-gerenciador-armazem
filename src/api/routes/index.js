import express from "express";

import testeRoutes from "./testeRoutes";

const router = express.Router();

router.use("/teste", testeRoutes);

console.log("🚀 -------------------🚀");
console.log("TESTE: Rotas disponiveis");
testeRoutes.stack.forEach((r) => {
  // console.log(`🚀 ~ r:`, r.route)
  if (r.route && r.route.path) {
    const [layer] = r.route.stack;

    console.log(
      layer.method.padEnd(6, " ").toUpperCase(),
      `/teste${r.route.path}`
    );
  }
});
export default router;

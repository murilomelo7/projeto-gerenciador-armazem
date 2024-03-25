import express from "express";
import logger from "../../config/logger";

import testeRoutes from "./testeRoutes";

const router = express.Router();

router.use("/teste", testeRoutes);

// logger.info("🚀 -------------------🚀");
// logger.info("TESTE: Rotas disponiveis");
// testeRoutes.stack.forEach((r) => {
//   // console.log(`🚀 ~ r:`, r.route)
//   if (r.route && r.route.path) {
//     const [layer] = r.route.stack;

//     logger.info(
//       layer.method.padEnd(6, " ").toUpperCase(),
//       `/teste${r.route.path}`
//     );
//   }
// });
export default router;

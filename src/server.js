import "dotenv/config";
import logger from "./config/logger";

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Backend rodando na porta: ${PORT} !!`);
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Sequelize from 'sequelize';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import getConfig from '../config/config.js'; // Importa a função de configuração
const env = process.env.NODE_ENV || 'development';
const config = getConfig(env); // Obtém as configurações específicas do ambiente

const basename = path.basename(__filename);
const srcPath = path.join(__dirname, 'src'); // Caminho para a pasta src
const modelsPath = path.join(srcPath, 'models'); // Caminho para a pasta de modelos

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(modelsPath) // Lê os arquivos na pasta de modelos
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes); // Importa os modelos da pasta de modelos
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

import { DataTypes, Model } from "sequelize";

const tableName = "Perfil";

class Perfil extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        acessos: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        createdAt: {
          columnName: "createdat",
          type: DataTypes.DATE,
          allowNull: true,
          field: "created_at", // nome personalizado da coluna
        },
        updatedAt: {
          columnName: "updatedat",
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_at", // nome personalizado da coluna
        },
      },
      {
        sequelize,
        tableName,
        modelName: Perfil,
        schema: "public",
      }
    );
  }
}

export default Perfil;

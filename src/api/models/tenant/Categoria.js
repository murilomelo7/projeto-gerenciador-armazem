import { DataTypes, Model } from "sequelize";

const tableName = "tb_categoria";

class Categoria extends Model {
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
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        createdAt: {
          columnName: "createdat",
          type: DataTypes.DATE,
          allowNull: true,
          field: "created_at",
        },
        updatedAt: {
          columnName: "updatedat",
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_at",
        },
      },
      {
        sequelize,
        tableName,
        modelName: Categoria,
        schema: "public",
      }
    );
  }
}

export default Categoria;

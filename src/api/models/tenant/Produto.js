import { DataTypes, Model } from "sequelize";

const tableName = "tb_produto";

class Produto extends Model {
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
        categoria_fk: {},
        quantidade_produto: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        data_validade: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        data_entrada: {},
        data_saida: {},
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
        modelName: Produto,
        schema: "public",
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.Categoria, {
      foreignKey: "categoria_fk",
      as: "categoriaFk",
    });
  }
}

export default Produto;

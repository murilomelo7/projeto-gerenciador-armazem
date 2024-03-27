import { DataTypes, Model } from "sequelize";

const tableName = "usuario";

class Usuario extends Model {
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
        usuario: {
          type: DataTypes.STRING(40),
          allowNull: false,
          unique: true,
        },
        senha: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(80),
          allowNull: false,
          unique: true,
        },
        cpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
        },
        perfil_fk: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        empresa_fk: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "created_at",
        },
        createdBy: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "created_by",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_at",
        },
        updatedBy: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "updated_by",
        },
      },
      {
        sequelize,
        tableName,
        modelName: Usuario,
        schema: "public",
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Perfil, { foreignKey: "perfil_fk", as: "perfilFk" });

    this.belongsTo(models.Empresa, {
      foreignKey: "empresa_fk",
      as: "empresaFk",
    });
  }
}
export default Usuario;

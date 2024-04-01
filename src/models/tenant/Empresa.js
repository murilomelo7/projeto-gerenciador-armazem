import { DataTypes, Model } from "sequelize";

const tableName = "Empresa";

class Empresa extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },

        tipo: {
          //? F = Física | J = Jurídica
          type: DataTypes.STRING(1),
          allowNull: false,
        },
        cpfCnpj: {
          field: "cpf_cnpj",
          type: DataTypes.STRING(14),
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING(80),
          allowNull: false,
        },
        telefone: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        endereco: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        cidade: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        estado: {
          type: DataTypes.STRING(2),
          allowNull: true,
        },
        cep: {
          type: DataTypes.STRING(8),
          allowNull: true,
        },
        status: {
          //? ativo, inativo, bloqueado, cancelado...
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "ativo",
        },
        observacoes: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        modelName: Empresa,
        schema: "public",
      },
    );
  }
}

export default Empresa;

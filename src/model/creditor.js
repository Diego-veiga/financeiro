import Sequelize, { Model } from 'sequelize';
import { v4 as uuid } from 'uuid';

export default class Creditor extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'O nome do usuario deve ter entre 3 e 50 caracteres'
            }
          }
        },
        active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      },
      {
        sequelize,
        tableName: 'creditor'
      }
    );
    this.beforeCreate(user => (user.id = uuid()));
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId' });
  }
}

import Sequelize, { Model } from 'sequelize';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export default class User extends Model {
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
        sobrenome: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'O sobrenome do usuario deve ter entre 3 e 50 caracteres'
            }
          }
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              msg: 'Email inválido'
            }
          },
          unique: {
            msg: 'email ja cadastrado'
          }
        },
        password_hash: { type: Sequelize.STRING },
        password: {
          type: Sequelize.VIRTUAL,
          allowNull: false,
          validate: {
            len: {
              args: [3, 200],
              msg: 'O campo senha precisa ter no minimo 3 caracteres'
            }
          }
        },
        ativo: {
          type: Sequelize.BOOLEAN,
          defaultValue: 1,
          allowNull: false
        }
      },
      {
        sequelize
      }
    );
    this.beforeCreate(user => (user.id = uuid()));

    this.addHook('beforeSave', async users => {
      if (users.password) {
        users.password_hash = await bcrypt.hash(users.password, 8);
      }
    });
    return this;
  }

  async passwordValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Creditor, { foreignKey: 'userId' });
    this.hasMany(models.Bill, { foreignKey: 'userId' });
  }
}

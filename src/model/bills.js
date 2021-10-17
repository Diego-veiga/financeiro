import Sequelize, { Model } from 'sequelize';
import { v4 as uuid } from 'uuid';

export default class Bill extends Model {
  static init(sequelize) {
    super.init(
      {
        // id: {
        //   primaryKey: true,
        //   type: Sequelize.UUID,
        //   autoIncrement: true
        // },
        description: {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'O nome do usuario deve ter entre 3 e 50 caracteres'
            }
          }
        },
        value: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          allowNull: false,
          validate: {
            isFloat: {
              msg: 'O valor da conta precisa ser do tipo Numero'
            },
            isEven(value) {
              if (value <= 0) {
                throw new Error('O valor da conta precisa ser menor que 0');
              }
            }
          }
        },
        installment: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          allowNull: false,
          validate: {
            isEven(value) {
              if (value <= 0) {
                throw new Error('O numero da parcela da conta não pode ser menor que 0');
              }
            }
          }
        },
        total_installment: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
          validate: {
            isEven(value) {
              if (value <= 0) {
                throw new Error('O numero da parcela da conta não pode ser menor que 0');
              }
            }
          }
        },
        type_bill: {
          type: Sequelize.ENUM,
          values: ['entry', 'output'],
          defaultValue: 'entry',
          allowNull: false
        },
        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        expiration_date: {
          type: Sequelize.DATE,
          defaultValue: 0,
          allowNull: false,
          validate: {
            isEven(value) {
              if (value <= Date.now()) {
                throw new Error(
                  'A data de vencimento  da conta precisa ser maior que a data de hoje  '
                );
              }
            }
          }
        }
      },
      {
        sequelize
      }
    );
    this.beforeCreate(bill => (bill.id = uuid()));
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Creditor, { foreignKey: 'creditor_id' });
  }
}

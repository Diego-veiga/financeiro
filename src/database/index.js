import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../model/user';
import Creditor from '../model/creditor';
import Bill from '../model/bills';

const models = [User, Creditor, Bill];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));

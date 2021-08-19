import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import '.';

import User from '../model/user';

const models = [User];

const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));

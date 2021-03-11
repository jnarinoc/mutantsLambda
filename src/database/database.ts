// tslint:disable-next-line: no-var-requires
const Sequelize = require('sequelize'); // NOSONAR
import config from '../config';

export const sequelizeMySQL = new Sequelize(
    config.bdName,
    config.bdUserName,
    config.bdPass,
    {
        dialect: 'postgres',
        host: config.bdHost,
        logging: false,
        pool: {
            acquire: 30000,
            idle: 10000,
            max: 5,
            min: 0
        },
        port: config.bdPort
    }
);

import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '@/services/sequelize';
import path from 'path';

export const umzug = new Umzug({
    migrations: {
        glob: path.join(__dirname, '../migrations/*.ts'),  // TODO: Make path absolute
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

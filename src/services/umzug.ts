import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '@/services/sequelize';
import { createUserDown, createUserUp } from '@/migrations/01-create-user';

export const umzug = new Umzug({
    migrations: [
        {
            name: '01-create-user',
            up: createUserUp,
            down: createUserDown
        }
    ],
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

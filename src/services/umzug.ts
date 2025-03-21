import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '@/services/sequelize';
import path from 'path';
import { down as createUserDown, up as createUserUp } from '@/migrations/01-create-user';

console.log(path.join(__dirname, '../migrations/*'));

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

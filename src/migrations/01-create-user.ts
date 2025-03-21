import { balanceNonNegativeConstraint } from '@/models/user';
import { QueryInterface, DataTypes } from 'sequelize';

export async function createUserUp({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.createTable('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    });

    // Add CHECK constraint separately
    await queryInterface.sequelize.query(`
    ALTER TABLE "Users"
    ADD CONSTRAINT ${balanceNonNegativeConstraint} CHECK (balance >= 0);
  `);
}

export async function createUserDown({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.dropTable('Users');
}

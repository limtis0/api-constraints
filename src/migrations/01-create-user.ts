import { QueryInterface, DataTypes } from 'sequelize';

export async function up({ context: queryInterface }: { context: QueryInterface }) {
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
    ADD CONSTRAINT balance_non_negative CHECK (balance >= 0);
  `);
}

export async function down({ context: queryInterface }: { context: QueryInterface }) {
    await queryInterface.dropTable('Users');
}

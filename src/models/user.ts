import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/services/sequelize';

interface UserAttributes {
    id: number;
    balance: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public balance!: number;
}

export const balanceNonNegativeConstraint = 'balance_non_negative';

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
    },
    {
        sequelize,
        tableName: 'Users',
        timestamps: false,
    }
);

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/databaseConfig';
import UserModel from './userModel';

class keysModel extends Model {
    public id!: number;
    public publicKey!: string;
    public privateKey!: string;
    public userId!: number;
}

keysModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    publicKey: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    },
    privateKey: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    tableName: 'keys',
});

export default keysModel;

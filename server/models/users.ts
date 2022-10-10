import { Sequelize, DataTypes, Model } from 'sequelize';
import { SequelizeAttributes } from '../SequelizeAttributes';

export interface UserTypeAttributes {
	id_hash: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserMethods
	extends Model<UserTypeAttributes>,
		UserTypeAttributes {}

type DataTypes = typeof DataTypes;

export const UserFactory = (sequelize: Sequelize, DataTypes: DataTypes) => {
	const attributes: SequelizeAttributes<UserTypeAttributes> = {
		id_hash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	};

	const users = sequelize.define<UserMethods, UserTypeAttributes>(
		'users',
		attributes,
		{
			freezeTableName: true,
		}
	);
	return users;
};

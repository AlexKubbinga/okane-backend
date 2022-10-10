import { Sequelize, DataTypes, Model } from 'sequelize';
import { SequelizeAttributes } from '../SequelizeAttributes';

/*
export interface SubscriptionTypeAttributes {
	code: string;
	name: string;
}

export interface SubscriptionMethods
	extends Model<SubscriptionTypeAttributes>,
		SubscriptionTypeAttributes {}

type DataTypes = typeof DataTypes;

export const SubscriptionFactory = (
	sequelize: Sequelize,
	DataTypes: DataTypes
) => {
	const attributes: SequelizeAttributes<SubscriptionTypeAttributes> = {
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const subscriptions = sequelize.define<
		SubscriptionMethods,
		SubscriptionTypeAttributes
	>('subscriptions', attributes, {
		freezeTableName: true,
	});
	return subscriptions;
};
*/

export interface CategoryTypeAttributes {
	code: string;
	name: string;
}

export interface CategoryMethods
	extends Model<CategoryTypeAttributes>,
		CategoryTypeAttributes {}

type DataTypes = typeof DataTypes;

export const CategoryFactory = (
	sequelize: Sequelize,
	DataTypes: DataTypes
) => {
	const attributes: SequelizeAttributes<CategoryTypeAttributes> = {
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const categories = sequelize.define<
		CategoryMethods,
		CategoryTypeAttributes
	>('categories', attributes, {
		freezeTableName: true,
	});
	return categories;
};

import { Sequelize, DataTypes, Model } from 'sequelize';
import { SequelizeAttributes } from '../SequelizeAttributes';

export interface MerchantTypeAttributes {
	id: number;
	code: string;
	name: string;
	short_name: string;
}

export interface MerchantMethods
	extends Model<MerchantTypeAttributes>,
		MerchantTypeAttributes {}

type DataTypes = typeof DataTypes;

export const MerchantFactory = (
	sequelize: Sequelize,
	DataTypes: DataTypes
) => {
	const attributes: SequelizeAttributes<MerchantTypeAttributes> = {
		id: {
			type: DataTypes.NUMBER,
			allowNull: false,
			primaryKey: true,
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		short_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	};

	const merchants = sequelize.define<
		MerchantMethods,
		MerchantTypeAttributes
	>('merchants', attributes, {
		freezeTableName: true,
	});
	return merchants;
};

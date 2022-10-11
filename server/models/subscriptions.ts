import { Sequelize, DataTypes, Model } from 'sequelize';
import { SequelizeAttributes } from '../SequelizeAttributes';

export interface SubscriptionTypeAttributes {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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

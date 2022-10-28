import { Sequelize, DataTypes, Model } from 'sequelize';
import { NumberLiteralType } from 'typescript';
import { SequelizeAttributes } from '../SequelizeAttributes';

export interface TransactionTypeAttributes {
  date: Date;
  month_end_date: Date;
  ccy: string;
  user_id: number;
  user_id_hash: string;
  merchant_id: number;
  subscription_id: number;
  category_id: number;
  value: number;
  value_ytd: number;
  value_ly: number;
}

export interface TransactionMethods
  extends Model<TransactionTypeAttributes>,
    TransactionTypeAttributes {}

type DataTypes = typeof DataTypes;

export const TransactionFactory = (
  sequelize: Sequelize,
  DataTypes: DataTypes
) => {
  const attributes: SequelizeAttributes<TransactionTypeAttributes> = {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    month_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ccy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    user_id_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    merchant_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    value: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    value_ytd: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    value_ly: {
      //last_year
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  };

  const transactions = sequelize.define<
    TransactionMethods,
    TransactionTypeAttributes
  >('transactions', attributes, {
    freezeTableName: true,
  });
  return transactions;
};

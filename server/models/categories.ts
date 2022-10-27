import { Sequelize, DataTypes, Model } from 'sequelize';
import { SequelizeAttributes } from '../SequelizeAttributes';

export interface CategoryTypeAttributes {
  id: number;
  code: string;
  name: string;
}

export interface CategoryMethods
  extends Model<CategoryTypeAttributes>,
    CategoryTypeAttributes {}

type DataTypes = typeof DataTypes;

export const CategoryFactory = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const attributes: SequelizeAttributes<CategoryTypeAttributes> = {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const categories = sequelize.define<CategoryMethods, CategoryTypeAttributes>(
    'categories',
    attributes,
    {
      freezeTableName: true,
    }
  );
  return categories;
};

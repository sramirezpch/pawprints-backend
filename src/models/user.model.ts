import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";

import { sequelize } from "@/sequelize";

export type UserAttributes = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

export class UserModel extends Model<UserAttributes, UserAttributes> {
  public id!: number;
  public name!: string;
  public lastname!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
export const User = sequelize.define<UserModel>("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => await User.sync({ alter: true }))();

User.beforeCreate(async (user) => {
  if (user.password) {
    const hashedPassword = await bcrypt.hash(user.password, 15);
    user.password = hashedPassword;
  }
})
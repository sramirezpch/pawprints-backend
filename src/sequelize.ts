import { Sequelize } from "sequelize";
import { DATABASE_URI, NODE_ENV } from "@/utils/env";

export const sequelize = new Sequelize(DATABASE_URI, {
  logging: NODE_ENV !== "production",
});

sequelize
  .authenticate()
  .catch((err) => console.log("Error connecting to the database:", err));

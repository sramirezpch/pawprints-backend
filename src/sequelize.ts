import { Sequelize } from "sequelize";
import { DATABASE_URI } from "@/utils/env";

export const sequelize = new Sequelize(DATABASE_URI);

sequelize
  .authenticate()
  .catch((err) => console.log("Error connecting to the database:", err));

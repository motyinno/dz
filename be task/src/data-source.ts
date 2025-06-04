import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./models/User";
import { Auth } from "./models/Auth";

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "jsonplaceholder",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [User, Auth],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

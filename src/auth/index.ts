import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Database } from "../database/Database";
import { authOpts, drizzleAdapterConfig } from "./authOpts";

const database = new Database();
export const auth = betterAuth(Object.assign({
  database: drizzleAdapter(database.db, drizzleAdapterConfig),
}, authOpts));

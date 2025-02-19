import { type BetterAuthOptions } from "better-auth";
import { type DrizzleAdapterConfig } from "better-auth/adapters/drizzle";
import {  username, bearer } from "better-auth/plugins";
import { account, session, user, verification } from "../database/schemas/Auth";
import { players } from "../database/schemas/Player";
import { worlds } from "../database/schemas/World";

export const authOpts: BetterAuthOptions = {
  plugins: [ 
    username(),
    bearer(),
  ],
  emailAndPassword: { 
    enabled:    true, 
    autoSignIn: false,
  },
  socialProviders: {
    discord: { 
      clientId:     "123",
      clientSecret: "123",
    }
  }, 
  session: {
    expiresIn: 60 * 60 * 24 * 7, // Expires in 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 5 * 60, // cache duration in seconds
    // },
  },
  trustedOrigins: ["http://localhost:5173"],
  user:           {
    additionalFields: {
      playerId: {
        type:     "number",
        required: false,
        input:    false,
      },
      role: {
        type:         "string",
        required:     false,
        input:        false,
        defaultValue: "2",
      },
    },

  }
};

export const drizzleAdapterConfig: DrizzleAdapterConfig = {
  provider: "sqlite",
  schema:   {
    user,
    account,
    session,
    verification,
    players,
    worlds
  }
};

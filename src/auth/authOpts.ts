import { type BetterAuthOptions } from "better-auth";
import { type DrizzleAdapterConfig } from "better-auth/adapters/drizzle";
import { jwt, username } from "better-auth/plugins";
import { account, jwks, session, user, verification } from "../database/schemas/Auth";
import { players } from "../database/schemas/Player";
import { worlds } from "../database/schemas/World";

export const authOpts: BetterAuthOptions = {
  plugins: [ 
    username() ,
    jwt(),
  ],
  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
    discord: { 
      clientId:     "123",
      clientSecret: "123",
    }
  }, 
  user: {
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
    jwks,
    players,
    worlds
  }
};

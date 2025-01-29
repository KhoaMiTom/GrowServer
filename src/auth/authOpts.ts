import { type BetterAuthOptions } from "better-auth";
import { username } from "better-auth/plugins";

export const authOpts: BetterAuthOptions = {
  plugins: [ 
    username() 
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
      }
    }
  }
};

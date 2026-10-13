
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const uri =
  process.env.BETTER_AUTH_DB_URL ||
  process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MongoDB connection URL");
}

const client = new MongoClient(uri);
const db = client.db("ph-b14-a07");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://ph-b14-a07.vercel.app",
  ],
});

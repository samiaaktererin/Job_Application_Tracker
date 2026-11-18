
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { initializeUserBoard } from "../init-user-board";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

// Reuse the native MongoDB client across serverless module reuse
const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ??
  (globalForMongo.mongoClient = new MongoClient(MONGODB_URI));

// Create the database handle without connecting immediately
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });

  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}

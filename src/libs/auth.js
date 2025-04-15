import { db } from '../database/drizzle'
import { schema } from '../database/schema'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
    schema
  }),
  emailAndPassword: {
    enabled: true,
    // After creating the account redirect, e.g. '/dashboard'
    autoSignIn: true
  },
  plugins: [nextCookies()]
})

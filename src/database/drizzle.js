// In development
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import { config } from 'dotenv'
import { Pool } from 'pg'

config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
export const db = drizzle(pool, { schema })

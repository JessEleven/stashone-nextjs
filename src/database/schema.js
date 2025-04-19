import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean, uuid, unique, jsonb } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
})

export const schemaMetadata = pgTable('schema_metadata', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title', { length: 128 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
}, (table) => ({
  uniqueUserTitle: unique().on(table.userId, table.title)
}))

export const schemaData = pgTable('schema_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: jsonb('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  schemaId: uuid('schema_id').notNull().references(() => schemaMetadata.id, { onDelete: 'cascade' })
})

export const schema = { user, session, account, verification, schemaMetadata, schemaData }

export const usersRelated = relations(user, ({ many }) => ({
  schemaMetadata: many(schemaMetadata)
}))

export const schemaMetadataRelated = relations(schemaMetadata, ({ one }) => ({
  user: one(user, { fields: [schemaMetadata.userId], references: [user.id] }),

  // Relation 1:1 with schemaData
  schemaData: one(schemaData, { fields: [schemaMetadata.id], references: [schemaData.schemaId] })
}))

export const schemaDataRelated = relations(schemaData, ({ one }) => ({
  schemaMetadata: one(schemaMetadata, { fields: [schemaData.schemaId], references: [schemaMetadata.id] })
}))

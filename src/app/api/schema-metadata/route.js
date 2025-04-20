import { db } from '@/database/drizzle'
import { schemaMetadata } from '@/database/schema'
import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST (req) {
  try {
    const { title, description, userId } = await req.json()

    const existingProject = await db.select()
      .from(schemaMetadata)
      .where(and(
        eq(schemaMetadata.title, title),
        eq(schemaMetadata.userId, userId)
      )).limit(1)

    if (existingProject.length > 0) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'The project name is already in use by you',
        data: []
      }, { status: 400 })
    }
    const schemaId = uuidv4()

    const result = await db.insert(schemaMetadata)
      .values({
        title,
        description,
        userId,
        schemaId
      }).returning({ insertedId: schemaMetadata.id })

    return NextResponse.json({
      success: true,
      status_code: 201,
      message: 'Project created successfully',
      data: result
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

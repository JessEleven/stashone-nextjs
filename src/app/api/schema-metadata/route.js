import { db } from '@/database/drizzle'
import { schemaMetadata } from '@/database/schema'
import { auth } from '@/libs/auth'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function GET () {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers()
    })

    if (!user.id) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'User is not authenticated'
      }, { status: 401 })
    }
    const allProjects = await db.select()
      .from(schemaMetadata)
      .where(eq(schemaMetadata.userId, user.id))
      .orderBy(desc(schemaMetadata.createdAt))

    if (allProjects.length === 0) {
      return NextResponse.json({
        success: false,
        status_code: 200,
        message: 'The project list is empty',
        data: []
      })
    }
    return NextResponse.json({
      success: true,
      status_code: 200,
      message: `The list of projects is ${allProjects.length}`,
      owner: user.name,
      email: user.email,
      data: allProjects
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

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

export async function DELETE (req) {
  try {
    const { user } = await auth.api.getSession({
      headers: await headers()
    })

    if (!user.id) {
      return NextResponse.json({
        success: false,
        status_code: 401,
        message: 'User is not authenticated'
      }, { status: 401 })
    }
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({
        success: false,
        status_code: 400,
        message: 'ID is missing to delete the project'
      }, { status: 400 })
    }
    const deleteProject = await db.delete(schemaMetadata)
      .where(and(
        eq(schemaMetadata.id, id),
        eq(schemaMetadata.userId, user.id)
      ))
      .returning()

    return NextResponse.json({
      success: true,
      status_code: 200,
      message: 'Project successfully deleted',
      data: deleteProject
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status_code: 500,
      message: error.message
    }, { status: 500 })
  }
}

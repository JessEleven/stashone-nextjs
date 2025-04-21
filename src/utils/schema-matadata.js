import { authClient } from '@/libs/auth-client'

export const getSchemaMetadata = async () => {
  try {
    const response = await fetch('/api/schema-metadata', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    const result = await response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to fetch user projects')
    }
    return result.data
  } catch (error) {
    console.error('Unexpected error:', error)
    return error
  }
}

export const createSchemaMetadata = async (formData) => {
  try {
    const { data } = await authClient.getSession()
    const userId = data?.user?.id

    if (!userId) {
      throw new Error('User is not authenticated')
    }
    const response = await fetch('/api/schema-metadata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        userId
      })
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Unexpected error:', error)
    return error
  }
}

export const deleteSchemaMetadata = async ({ id, onSuccess }) => {
  try {
    const response = await fetch('/api/schema-metadata', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    const result = response.json()

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to delete the project')
    }

    if (onSuccess) onSuccess()

    return result.data
  } catch (error) {
    console.error('Unexpected error:', error)
    return error
  }
}

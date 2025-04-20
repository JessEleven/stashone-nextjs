import { authClient } from '@/libs/auth-client'

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

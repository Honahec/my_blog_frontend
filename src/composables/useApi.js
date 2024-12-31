import { useAuth } from './useAuth'

export function useApi() {
  const { api } = useAuth()

  const getPosts = async () => {
    const response = await api.get('/posts/')
    return response.data
  }

  const getPost = async (slug) => {
    const response = await api.get(`/posts/${slug}/`)
    return response.data
  }

  const createPost = async (postData) => {
    const response = await api.post('/posts/', postData)
    return response.data
  }

  const updatePost = async (slug, postData) => {
    const response = await api.put(`/posts/${slug}/`, postData)
    return response.data
  }

  const deletePost = async (slug) => {
    await api.delete(`/posts/${slug}/`)
  }

  const getPublishedPosts = async () => {
    const response = await api.get('/posts/published/')
    return response.data
  }

  const getDrafts = async () => {
    const response = await api.get('/posts/drafts/')
    return response.data
  }

  return {
    api,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPublishedPosts,
    getDrafts
  }
} 
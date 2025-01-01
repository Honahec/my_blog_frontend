import { useAuth } from './useAuth'

export function useApi() {
  const { api } = useAuth()

  const post = async (url, data) => {
    const response = await api.post(url, data)
    return response.data
  }

  const getPosts = async (params = '') => {
    const response = await api.get(`/posts/${params}`)
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

  const getTags = async () => {
    const response = await api.get('/posts/tags/')
    return response.data
  }

  return {
    api,
    post,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPublishedPosts,
    getDrafts,
    getTags
  }
} 
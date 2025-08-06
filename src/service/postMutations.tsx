import API_GET from "../api/api"

export const createUser = async (userData: any) => {
  const res = await API_GET.post('/users', userData)
  return res.data
}

export const login = async (userData: any) => {
  const res = await API_GET.post('/auth/login', userData)
  return res.data
}

export const updateUser = async ({ id, updatedData }: {id: string, updatedData: any }) => {
  const res = await API_GET.put(`/users/${id}`, updatedData)
  return res.data
}

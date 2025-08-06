import API_GET from "../api/api"

export const fetchUsers = async () => {
  const res = await API_GET.get('/users')
  return res.data
}

export const fetchUserById = async (id:string) => {
  const res = await API_GET.get(`/users/${id}`)
  return res.data
}

import { getUserBy } from '../repositories/user'

export async function getUserByLogin(login: string) {
  const user = await getUserBy({
    login,
  })

  return user
}

export default {
  getUserByLogin,
}

import User from '../entity/user'
import R from 'ramda'

export async function getUserBy(filter: {
  login?: string
  password?: string
  email?: string
}): Promise<User[]> {
  const f = R.reject((n) => typeof n === 'undefined', filter)
  const res = await User.find(f)
  return res
}

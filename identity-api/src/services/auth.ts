import { generateJsonWebToken, validateByBcrypt } from '../libs/auth'

export async function generateToken(
  user: { login: string; hashPassword: string },
  password: string
): Promise<string> {
  const isPasswordValid = await validateByBcrypt(password, user.hashPassword)
  if (!isPasswordValid) {
    throw new Error('Unauthorized')
  }

  const token = generateJsonWebToken(user.login)
  return token
}

export default {
  generateToken,
}

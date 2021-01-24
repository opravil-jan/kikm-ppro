import Axios from 'axios'

export async function getAccessToken(
  login: string,
  password: string
): Promise<string> {
  const token = await Axios.post(
    `${process.env.SERVER}/v1/auth/get-access-token`,
    {
      login,
      password,
    }
  )

  if (token.data?.token) {
    return token.data?.token
  } else {
    throw new Error('Token was not generated')
  }
}

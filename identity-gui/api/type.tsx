import Axios from 'axios'

export async function getTypesData(token: string): Promise<any> {
  const clientData = await Axios.get(`${process.env.SERVER}/v1/types`, {
    headers: {
      Authorization: `${token}`,
    },
  })

  return clientData
}

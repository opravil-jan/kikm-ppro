import Axios from 'axios'

export async function updateClient(
  id: string,
  name: string,
  description: string,
  token: string
): Promise<void> {
  await Axios.patch(
    `${process.env.SERVER}/v1/client`,
    {
      id,
      name,
      description,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  )
}

export async function getClientData(token: string): Promise<any> {
  const clientData = await Axios.get(`${process.env.SERVER}/v1/client`, {
    headers: {
      Authorization: `${token}`,
    },
  })

  return clientData
}

export async function deleteClientData(
  token: string,
  id: string
): Promise<any> {
  const clientData = await Axios.delete(
    `${process.env.SERVER}/v1/client/${id}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  )

  return clientData
}

export async function createClientData(
  token: string,
  name: string,
  description: string,
  type: string
): Promise<any> {
  const clientData = await Axios.post(
    `${process.env.SERVER}/v1/client`,
    { name, description, type },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  )

  return clientData
}

import Axios from 'axios'

export async function createContact(
  token: string,
  name: string,
  contact: string,
  owner: string
) {
  await Axios.post(
    `${process.env.SERVER}/v1/contact`,
    { name, contact, owner },
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  )
}

export async function getContacts(token: string) {
  const data = await Axios.get(`${process.env.SERVER}/v1/contact`, {
    headers: {
      Authorization: `${token}`,
    },
  })

  return data
}

export async function deleteContact(token: string, id: string) {
  await Axios.delete(`${process.env.SERVER}/v1/contact/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  })
}

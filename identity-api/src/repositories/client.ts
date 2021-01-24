import { getRepository, getConnection } from 'typeorm'
import Client from '../entity/client'
import { getTypesById } from '../repositories/type'

export interface IClient {
  id?: string
  name: string
  description: string
  type?: number
}

export async function getClientByName(name: string): Promise<Client[]> {
  const res = await getRepository(Client)
    .createQueryBuilder('client')
    .innerJoinAndSelect('client.identityType', 'identity_type')
    .where('client.name = :name', { name })
    .getMany()

  return res
}

export async function getClientById(id: string): Promise<Client | undefined> {
  const res = await getRepository(Client)
    .createQueryBuilder('client')
    .where('client.id = :id', { id })
    .getOne()

  return res
}

export async function getClients(): Promise<Client[]> {
  const res = await getRepository(Client)
    .createQueryBuilder('client')
    .innerJoinAndSelect('client.identityType', 'identity_type')
    .getMany()

  return res
}

export async function createClient(client: IClient) {
  const type = await getTypesById(client.type || 1)

  const cli = new Client()
  cli.name = client.name
  cli.description = client.description
  cli.identityType = type

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(Client)
    .values(cli)
    .execute()
}

export async function updateClient(client: IClient): Promise<void> {
  await getConnection()
    .createQueryBuilder()
    .update(Client)
    .set({
      name: client.name,
      description: client.description,
    })
    .where('id = :id', { id: client.id })
    .execute()
}

export async function deleteClient(id: string): Promise<void> {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Client)
    .where('id = :id', { id })
    .execute()
}

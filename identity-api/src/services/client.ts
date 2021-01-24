import Client from '../entity/client'
import {
  getClientByName as getClient,
  getClients as clients,
  updateClient as updateCli,
  deleteClient as del,
} from '../repositories/client'
import { IClient } from '../repositories/client'
import { createClient as create } from '../repositories/client'

export async function getClientByName(name: string): Promise<Client[]> {
  const res = await getClient(name)
  return res
}

export async function getClients(): Promise<Client[]> {
  const res = await clients()
  return res
}

export async function createClient(client: IClient) {
  await create(client)
}

export async function updateClient(client: IClient): Promise<void> {
  await updateCli(client)
}

export async function deleteClient(name: string) {
  await del(name)
}

export default {
  getClientByName,
  getClients,
  updateClient,
  deleteClient,
  createClient,
}

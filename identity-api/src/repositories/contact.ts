import Contact from '../entity/contact'
import { getClientById } from './client'
import { getRepository, getConnection } from 'typeorm'

export async function saveContact(
  name: string,
  contact: string,
  owner: string
): Promise<void> {
  const cli = await getClientById(owner)
  if (cli) {
    const c = new Contact()
    c.name = name
    c.client = cli
    c.contact = contact
    c.save()
  } else {
    throw new Error('Client not found')
  }
}

export async function getContacts(): Promise<any[]> {
  const res = await getRepository(Contact)
    .createQueryBuilder('contact')
    .innerJoinAndSelect('contact.client', 'client')
    .getMany()

  return res
}

export async function deleteContacts(id: string): Promise<void> {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Contact)
    .where('id = :id', { id })
    .execute()
}

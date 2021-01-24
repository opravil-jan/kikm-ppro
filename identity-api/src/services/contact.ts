import {
  saveContact as save,
  getContacts as getCon,
  deleteContacts as delCon,
} from '../repositories/contact'

export async function saveContact(
  name: string,
  contact: string,
  owner: string
): Promise<void> {
  await save(name, contact, owner)
}

export async function getContacts(): Promise<any[]> {
  const res = await getCon()
  return res
}

export async function deleteContact(id: string) {
  await delCon(id)
}

export default {
  saveContact,
  getContacts,
  deleteContact,
}

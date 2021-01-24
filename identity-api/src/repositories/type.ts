import { getConnection } from 'typeorm'
import Type from '../entity/identityType'

export async function getTypes() {
  const res = await getConnection().getRepository(Type).find()
  return res
}

export async function getTypesById(id: number): Promise<Type> {
  const res = await getConnection()
    .getRepository(Type)
    .createQueryBuilder('type')
    .where('id = :id', { id })
    .getOne()

  if (res) {
    return res
  }

  throw Error('No type found')
}

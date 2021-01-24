import { getTypes } from '../repositories/type'

export async function getClientTypes() {
  const types = await getTypes()
  return types
}

export default {
  getClientTypes,
}

import EditClientTable from './client/editClientTable'
import { useCookies } from 'react-cookie'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { getClientData } from '../api/client'

const EditClient = () => {
  const [cookies, setCookies] = useCookies(['access-token'])
  const [data, setData] = useState([])

  useEffect(() => {
    getClientData(cookies['access-token'])
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return <EditClientTable data={data} />
}

export default EditClient

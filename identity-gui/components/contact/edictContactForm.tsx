import { Table, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { getContacts } from '../../api/contact'
import { useCookies } from 'react-cookie'
import Router from 'next/router'
import { deleteContact } from '../../api/contact'

interface IContact {
  id: string
  name: string
  contact: string
  client: {
    name: string
  }
}

export default function () {
  const [contacts, setContacts] = useState([])
  const [cookies, setCookies] = useCookies(['access-token'])

  useEffect(() => {
    getContacts(cookies['access-token']).then((res) => {
      setContacts(res.data)
    })
  }, [])

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((i: IContact, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{i.name}</td>
              <td>{i.contact}</td>
              <td>{i.client?.name || '---'}</td>
              <td>
                <span>
                  <Button
                    style={{ width: '80px' }}
                    variant="danger"
                    onClick={() => {
                      deleteContact(cookies['access-token'], i.id).then(() => {
                        Router.reload()
                      })
                    }}
                  >
                    delete
                  </Button>
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

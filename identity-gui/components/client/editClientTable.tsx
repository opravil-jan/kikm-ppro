import { Table, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import EditClientForm from './editClientForm'
import { IClientForm } from './editClientForm'
import { deleteClientData } from '../../api/client'
import { useCookies } from 'react-cookie'
import Router from 'next/router'

const EditClientTable = (val) => {
  const [modalHidden, setModalHidden] = useState(true)
  const [selectedClient, setSelectedClient] = useState({
    name: '',
  })
  const [cookies, setCookies] = useCookies(['access-token'])

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Expiration</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {val.data.map((i: IClientForm, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{i.name}</td>
                <td>{i.description}</td>
                <td>{i.expiration || '---'}</td>
                <td>{i.identityType.name}</td>
                <td>
                  <span>
                    <Button
                      style={{ width: '80px', marginRight: '10px' }}
                      variant="success"
                      onClick={() => {
                        setModalHidden(false)
                        setSelectedClient(val.data[index])
                      }}
                    >
                      edit
                    </Button>
                  </span>
                  <span>
                    <Button
                      style={{ width: '80px' }}
                      variant="danger"
                      onClick={() => {
                        deleteClientData(cookies['access-token'], i.id).then(
                          () => {
                            Router.reload()
                          }
                        )
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

      <Modal
        show={!modalHidden}
        onHide={() => {
          setModalHidden(true)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editing {selectedClient.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClientForm data={selectedClient} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditClientTable

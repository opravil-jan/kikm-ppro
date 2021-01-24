import { Formik } from 'formik'
import { Form, Button, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useCookies } from 'react-cookie'
import { createContact } from '../api/contact'
import { getClientData } from '../api/client'

export default function CreateContactContactCreate() {
  const [cookies, setCookies] = useCookies(['access-token'])
  const [message, setMessage] = useState('')
  const [clients, setClients] = useState([])
  const [clientId, setClientId] = useState('')

  useEffect(() => {
    getClientData(cookies['access-token'])
      .then((res) => {
        setClientId(res.data.length > 0 ? res.data[0].id : '')
        setClients(res.data)
      })
      .catch((err) => {
        setMessage('clients not available')
      })
  }, [])

  return (
    <Row>
      <Formik
        initialValues={{
          name: '',
          contact: '',
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          createContact(
            cookies['access-token'],
            data.name,
            data.contact,
            clientId
          )
            .then((res) => {
              setMessage('contact created')
              setSubmitting(false)
            })
            .catch((err) => {
              setMessage('creating contact error')
              setSubmitting(false)
            })
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className={styles.userForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                name="contact"
                type="text"
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => {
                  clients.map((i) => {
                    if (i.name === event.target.value) {
                      setClientId(i.id)
                    }
                  })
                }}
              >
                {clients.map((item) => {
                  return <option>{item.name}</option>
                })}
              </Form.Control>
            </Form.Group>

            <Button type="submit">create</Button>
            <div>{message}</div>
          </Form>
        )}
      </Formik>
    </Row>
  )
}

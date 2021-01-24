import { Formik } from 'formik'
import { Form, Row, Button } from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import { createClientData } from '../api/client'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { getTypesData } from '../api/type'

export default function () {
  const [cookies, setCookies] = useCookies(['access-token'])
  const [message, setMessage] = useState('')
  const [types, setTypes] = useState([])
  const [sTyp, setsTyp] = useState('1')

  useEffect(() => {
    getTypesData(cookies['access-token'])
      .then((res) => {
        setTypes(res.data)
      })
      .catch((err) => {
        setMessage('creating client error')
      })
  }, [])

  return (
    <Row>
      <Formik
        initialValues={{
          name: '',
          description: '',
          expiration: '',
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          createClientData(
            cookies['access-token'],
            data.name,
            data.description,
            sTyp
          )
            .then((res) => {
              setMessage('client created')
              setSubmitting(false)
            })
            .catch((err) => {
              setMessage('creating client error')
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => {
                  types.map((i) => {
                    if (i.name === event.target.value) {
                      setsTyp(i.id)
                    }
                  })
                }}
              >
                {types.map((item) => {
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

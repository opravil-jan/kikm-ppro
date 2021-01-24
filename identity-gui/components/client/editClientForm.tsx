import { Formik } from 'formik'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { updateClient } from '../../api/client'
import Router from 'next/router'

export interface IClientForm {
  id: string
  name: string
  description: string
  expiration: string
  identityType: {
    id: number
    name: string
  }
}

const EditClientForm = (data) => {
  const [cookies, setCookies] = useCookies(['access-token'])
  const [errorMessage, setErrorMessage] = useState('')
  const { name, description, id } = data.data

  return (
    <Formik
      initialValues={{
        id,
        name,
        description,
      }}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true)
        updateClient(
          data.id,
          data.name,
          data.description,
          cookies['access-token']
        )
          .then((res) => {
            setSubmitting(false)
          })
          .catch((err) => {
            if (String(err).includes('code 500')) {
              setErrorMessage('Server error')
            } else {
              setErrorMessage('Invalid credentials')
            }
            setSubmitting(false)
          })
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div>{errorMessage}</div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              value={values.description}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              Router.reload()
            }}
          >
            Save Changes
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default EditClientForm

import { useState } from 'react'
import { Formik } from 'formik'
import { Form, Button, Spinner } from 'react-bootstrap'
import { getAccessToken } from '../../api/login'
import { useCookies } from 'react-cookie'
import styles from '../../styles/Home.module.css'

const LoginForm = () => {
  const [cookies, setCookies] = useCookies(['access-token'])
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          getAccessToken(data.login, data.password)
            .then((res) => {
              setCookies('access-token', res)
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Login</Form.Label>
              <Form.Control
                name="login"
                type="text"
                placeholder="Enter yours login"
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Text className="text-muted">
                Never share yours credentials with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter yours password"
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Form.Group>

            {isSubmitting ? (
              <Spinner
                animation="border"
                variant="primary"
                className={styles.loginFormSpinner}
              />
            ) : (
              <Button variant="primary" type="submit">
                Log-in
              </Button>
            )}
            <span className={styles.errorMessage}>
              <b>{errorMessage}</b>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm

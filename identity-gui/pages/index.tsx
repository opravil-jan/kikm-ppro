import styles from '../styles/Home.module.css'
import { Row, Container, Jumbotron } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import Login from '../components/login'

export default function Home() {
  const [cookies, setCookies] = useCookies(['access-token'])

  return (
    <div className={styles.container}>
      <div>
        <Container>
          {!cookies['access-token'] ? (
            <Row>
              <Login />
            </Row>
          ) : (
            <>
              <Jumbotron>
                <h1>Identity</h1>
                <br />
                <ul>
                  <li>
                    Client can be added and deleted form navigation above.
                  </li>
                  <li>
                    Contact must be assigned to every client. You can do that in
                    navigation above.
                  </li>
                  <li>Client can have relationship between each other.</li>
                </ul>
              </Jumbotron>
            </>
          )}
        </Container>
      </div>
    </div>
  )
}

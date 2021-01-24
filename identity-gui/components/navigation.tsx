import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const Navigation = (): JSX.Element => {
  const [cookies, setCookies] = useCookies(['access-token'])
  const router = useRouter()

  return (
    <Navbar expand="lg">
      <Navbar.Brand
        className={styles.clickableCursor}
        onClick={() => {
          router.push('/')
        }}
      >
        Identity
      </Navbar.Brand>
      {cookies['access-token'] && (
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      )}
      {cookies['access-token'] && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Contacts" id="basic-nav-contact">
              <NavDropdown.Item
                onClick={() => {
                  router.push('/createContact')
                }}
              >
                new contact
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  router.push('/editContact')
                }}
              >
                edit contact
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Clients" id="basic-nav-client">
              <NavDropdown.Item
                onClick={() => {
                  router.push('/createClient')
                }}
              >
                new client
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  router.push('/editClient')
                }}
              >
                edit client
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  )
}

export default Navigation

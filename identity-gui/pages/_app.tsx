import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CookiesProvider } from 'react-cookie'
import Navigation from '../components/navigation'

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Navigation />
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default MyApp

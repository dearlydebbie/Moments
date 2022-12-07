import Page from '../components/Page'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps }) {
  return (
  <Page>
    <ToastContainer limit={1} />
    <Component {...pageProps} />
  </Page>
  )
}

export default MyApp

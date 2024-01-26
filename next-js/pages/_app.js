import Layout from '../components/global/layout'
 
import "../components/global/globals.css";


export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
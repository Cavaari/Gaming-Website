import Layout from '../components/global/layout'

import "../components/global/globals.css";
import useSocket from '@/components/socket/useSocket';
import SocketContext from '@/components/SocketContext';



export default function MyApp({ Component, pageProps }) {
  const socket = useSocket()


  return (
    <SocketContext.Provider value={socket}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SocketContext.Provider>
  )
}
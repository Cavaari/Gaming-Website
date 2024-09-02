import Layout from '../components/global/layout'

import "../components/global/globals.css";
import useSocket from '@/components/socket/useSocket';
import SocketContext from '@/components/SocketContext';

import BootstrapClient from '@/components/global/BootstrapClient';
import "/components/global/global.scss"

import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const socket = useSocket()


  const [isDark, setIsDark] = useState(true)

  const changeTheme = () => {
    if (isDark) {
      setIsDark(false)
    } else {
      setIsDark(true)
    }
  }


  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      // import(`../components/global/dark-theme.scss`);
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light')
      // import(`../components/global/light-theme.scss`);
    }
  }, [isDark])

  return (
    <SocketContext.Provider value={socket}>
      <Layout changeTheme={changeTheme}>
        <Component {...pageProps} />
      </Layout>
      <BootstrapClient />
    </SocketContext.Provider>
  )
}
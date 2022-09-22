/* eslint-disable react/prop-types */
import '../styles/globals.css'
import 'antd/dist/antd.css'

import { ThemeProvider } from 'next-themes'
import { GlobalContext } from '../contexts/ContextProvider'

function MyApp ({ Component, pageProps }) {
  return (
    <GlobalContext>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalContext>
  )
}

export default MyApp

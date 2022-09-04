/* eslint-disable react/prop-types */
import '../styles/globals.css'
import 'antd/dist/antd.css'

import { ThemeProvider } from 'next-themes'

function MyApp ({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

import Head from 'next/head'

import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'

const index = (props) => {
  const { title, description, keywords, author, ogTitle, ogDescription, children } = props
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#e9ecef] dark:bg-gray-800 text-white transition-all ease-in-out duration-300">
      <Head>
        <title className="text-5xl font-bold">{title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content="/images/favico.png" />
        <link rel="icon" href="/images/favico.png" />
      </Head>
      <Header />
      <Sidebar />
      <Content>
        {children}
      </Content>
    </div>
  )
}

export default index

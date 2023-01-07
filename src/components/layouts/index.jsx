import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'

const Layout = (props) => {
  const { children } = props
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#e9ecef] dark:bg-gray-800 text-white transition-all ease-in-out duration-300">
      <Header />
      <Sidebar />
      <Content>{children}</Content>
    </div>
  )
}

export default Layout

import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'

const index = () => {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#34A0A4] text-black dark:text-white">
      <Header />
      <Sidebar />
      <Content>
        <p className="flex text-xl"></p>
      </Content>
    </div>
  )
}

export default index

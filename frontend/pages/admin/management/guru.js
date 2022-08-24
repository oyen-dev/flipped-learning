import Content from '../../../components/layout/Content'
import Header from '../../../components/layout/Header'
import Sidebar from '../../../components/layout/Sidebar'
import TableTwoColumn from '../../../components/table/TableTwoColumn'

const guru = () => {
  return (
    <div>
      <Header>
        <p className='px-10 pt-5 font-medium'>Flipped Learning</p>
      </Header>

      <Sidebar>

      </Sidebar>

      <Content>
        <div className='flex flex-col space-x-4'>
          <TableTwoColumn />
          <TableTwoColumn />
        </div>
      </Content>
    </div>
  )
}
export default guru

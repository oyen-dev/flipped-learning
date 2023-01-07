import Layout from '../../../components/layouts'
import { Breadcrumb } from '../../../components/breadcrumb'
import { useParams, useNavigate } from 'react-router-dom'
import ClassDetail from '../../../views/class/ClassDetail'

const ClassDetailPage = () => {
  // Use params
  const { id } = useParams()

  // Navigator
  const navigate = useNavigate()

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Manajemen Kelas',
      destination: '/management/classes'
    },
    {
      name: 'Detail Kelas',
      destination: `/management/classes/${id}`
    }
  ]

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />

      <ClassDetail />
    </Layout>
  )
}

export default ClassDetailPage

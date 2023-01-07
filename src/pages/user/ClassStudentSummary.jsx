
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { ClassSummary } from '../../views/class'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

const ClassStudentSummary = () => {
  // Use params
  const { id } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Daftar Kelas',
      destination: '/classes'
    },
    {
      name: 'Beranda Kelas',
      destination: `/classes/${id}`
    },
    {
      name: 'Rekap Studi',
      destination: pathname
    }
  ]

  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />

      <ClassSummary />

    </Layout>
  )
}

export default ClassStudentSummary

import { useRouter } from 'next/router'

import Layout from '../../../../components/layout'

const user = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <Layout
      title="Admin"
      description="Admin page for user management"
      keywords="Admin page user management"
      author="Admin"
      ogTitle="Admin"
      ogDescription="Admin page for user management"
      ogImage="https://www.example.com/image.jpg"
    >
      <p>Ini data user dengan id {id}</p>
    </Layout>
  )
}

export default user

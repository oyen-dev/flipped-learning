import Layout from '../../../components/layout'
import RecentAccess from '../../../components/table/RecentAccess'

const guru = () => {
  return (
    <Layout
      title="Admin"
      description="Admin page"
      keywords="Admin page"
      author="Admin"
      ogTitle="Admin"
      ogDescription="Admin page"
      ogImage="https://www.example.com/image.jpg"
    >
      <div className='w-full grid auto-rows-auto lg:grid-cols-2 gap-5'>
        <div className='flex flex-col w-full items-start justify-start bg-gray-900 px-5 py-5 rounded-lg'>
          <p className='text-base font-medium'>Riwayat Akses Terkini</p>
          <RecentAccess />
        </div>

        <div className='flex flex-col w-full items-start justify-start bg-gray-900 px-5 py-5 rounded-lg'>
          <p className='text-base font-medium'>Statistik Warga Sekolah</p>
          <RecentAccess />
        </div>
      </div>
    </Layout>
  )
}
export default guru

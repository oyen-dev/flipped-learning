import Layout from '../../components/layouts'
import { RecentAccess, ActiveClass } from '../../components/tables'
import { Statistic } from '../../views/dashboard'

const DashboardPage = () => {
  return (
    <Layout>
      <div className="w-full grid auto-rows-auto lg:grid-cols-2 gap-5">
        <div className="flex flex-col w-full items-center lg:items-start justify-start text-gray-900 dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
          <p className="text-base font-semibold pb-5 mb-0">
            Riwayat Akses Terkini
          </p>
          <RecentAccess />
        </div>

        <div className="flex flex-col w-full items-center lg:items-start justify-start text-gray-900 dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
          <p className="text-base font-semibold pb-5 mb-0">
            Statistik Warga Sekolah
          </p>
          <Statistic />
        </div>
      </div>
      <div className="flex flex-col w-full items-center lg:items-start justify-start text-gray-900 dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
        <p className="text-base font-semibold pb-5 mb-0">Daftar Kelas Aktif</p>
        <div className="flex flex-col w-full items-start justify-start overflow-x-auto">
          <ActiveClass />
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage

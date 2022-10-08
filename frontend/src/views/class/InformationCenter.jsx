import { PostTaskInfo } from '../../components/forms'

const InformationCenter = (props) => {
  const { id } = props
  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-2 px-4 space-y-4 rounded-lg text-white z-10 bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">

      {/* Class Header Info */}
      <div className="w-full flex flex-col space-y-4">
        <div className="flex w-full justify-center">
          <p className="text-center font-semibold text-lg md:text-2xl mb-0">
            Kelas XI - Multimedia: Teknik Pengolahan Audio Video
          </p>
        </div>
        <div className="w-full flex flex-col justify-start">
          <p className="mb-0 text-xs md:text-base">
            Pengajar: Budi Tono, S.Pd.
          </p>
          <p className="mb-0 text-xs md:text-base">Kode Kelas: {id}</p>
        </div>
      </div>

      {/* Presensi  */}
      <div className="flex w-full justify-end">
        <button className="py-1 px-4 font-normal md:py-2 md:px-4 md:font-medium bg-[#34A0A4] rounded-lg">
          Buka Presensi
        </button>
      </div>

      {/* Posting Informasi */}
      <PostTaskInfo />

    </div>
  )
}

export default InformationCenter

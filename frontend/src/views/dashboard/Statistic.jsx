import { Spin } from 'antd'

const Statistic = (props) => {
  const { statistic } = props
  const { totalTeachers, totalStudents, ratio } = statistic
  // console.log(statistic)
  return (
    <div className="flex flex-col w-full h-full space-y-10 text-gray-900 dark:text-white">
      <div className="flex flex-row items-center justify-around space-x-5">
        <div className="flex flex-col hover:text-blue-500 duration-150">
          <p className="text-base font-normal mb-0">Total Guru</p>
          <div className="text-2xl text-center font-bold mb-0">{totalTeachers === null ? <Spin /> : totalTeachers}</div>
        </div>

        <div className="flex flex-col hover:text-blue-500 duration-150">
          <p className="text-base font-normal mb-0">Total Siswa</p>
          <div className="text-2xl text-center font-bold mb-0">{totalStudents === null ? <Spin /> : totalStudents}</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center hover:text-blue-500 duration-150">
        <p className="text-base font-normal mb-0">Rasio</p>
        <div className="text-2xl text-center font-bold mb-0">{ratio === null ? <Spin /> : `1 : ${ratio}`}</div>
      </div>
    </div>
  )
}

export default Statistic

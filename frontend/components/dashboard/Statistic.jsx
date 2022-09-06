const Statistic = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-10 text-gray-900 dark:text-white">
      <div className="flex flex-row items-center justify-around space-x-5">
        <div className="flex flex-col hover:text-blue-500 duration-150">
          <p className="text-base font-normal mb-0">Total Guru</p>
          <p className="text-2xl text-center font-bold mb-0">17</p>
        </div>

        <div className="flex flex-col hover:text-blue-500 duration-150">
          <p className="text-base font-normal mb-0">Total Siswa</p>
          <p className="text-2xl text-center font-bold mb-0">314</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center hover:text-blue-500 duration-150">
        <p className="text-base font-normal mb-0">Rasio</p>
        <p className="text-2xl text-center font-bold mb-0">1 : 34</p>
      </div>
    </div>
  )
}

export default Statistic

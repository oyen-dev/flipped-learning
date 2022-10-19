import { Register } from '../../components/forms'

import { Link } from 'react-router-dom'

import UBBG from '../../assets/images/ubbg.png'

const RegisterPage = () => {
  return (
    <main className="min-h-screen flex flex-col px-5 py-10 bg-gray-800 items-center justify-center space-y-10 text-white">
        <div className="flex w-full space-x-10 justify-center">
          <img src={UBBG} alt="UBBG" className='flex w-[10%]'/>
        </div>
        <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
          Pendaftaran Pengguna Online Learning
        </p>
        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[35%] space-y-2">
          <Register />
          <Link to='/auth' className="flex flex-col space-y-2 items-center text-white">
              <button className="text-base font-semibold mb-0 hover:text-blue-500 duration-150 cursor-pointer">Kembali ke Login</button>
          </Link>
        </div>
      </main>
  )
}

export default RegisterPage

import { Login } from '../../components/forms'

import { Link } from 'react-router-dom'
import { Button } from 'antd'

const LoginPage = () => {
  return (
    <main className="min-h-screen flex flex-col px-5 py-2 bg-gray-800 items-center justify-center space-y-10 text-white">
      <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
        Masuk Online Learning
      </p>
      <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[35%] space-y-2">
        <Login />
        <div className="flex flex-col w-full text-sm items-center">
          <p className="text-sm text-white mb-0">Belum punya akun?</p>
          <Link to="/auth/register">
            <Button type="link" className="w-full">
              <p className="font-semibold text-base text-white hover:text-blue-500 cursor-pointer duration-150">
                Daftar
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default LoginPage

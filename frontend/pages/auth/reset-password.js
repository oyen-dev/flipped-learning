import Head from 'next/head'
import Link from 'next/link'

import { Button } from 'antd'
import { ResetPasswordForm } from '../../components/authentication/forms'

const Login = () => {
  return (
    <div>
      <Head>
        <title>Forgot Password Flipped Learning</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col px-5 py-2 bg-gray-800 items-center justify-center space-y-10 text-white">
        <div className="flex w-full space-x-10 justify-center">
          <div className="w-20 h-20 bg-gray-200" />
          <div className="w-20 h-20 bg-gray-200" />
        </div>
        <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
          Reset Password
        </p>
        <div className="flex flex-col w-[80%] md:w-[70%] lg:w-[30%] space-y-2">
          <ResetPasswordForm />
        </div>
      </main>
    </div>
  )
}

export default Login

import { useEffect, useState } from 'react'
import { useGlobal } from '../../contexts/Global'

import api from '../../api'
import { useSearchParams } from 'react-router-dom'

import { ResetPassword } from '../../components/forms'

const ResetPasswordPage = () => {
  // Search Params
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [text, setText] = useState('Atur ulang passwordmu')
  const [isValid, setIsValid] = useState(false)

  // Check if token is valid
  useEffect(() => {
    const checkToken = async () => {
      await api.get(`/auth/reset-password?token=${token}`)
        .then(res => {
          console.log(res.data)
          setIsValid(true)
        })
        .catch(err => {
          console.log(err)
          setText(err.response.data.message)
          mySwal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 3000
          })
        })
    }

    checkToken()
  }, [])

  return (
    <main className="min-h-screen flex flex-col px-5 py-10 bg-gray-800 items-center justify-center space-y-10 text-white">
        <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
          {text}
        </p>
        <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[35%] space-y-2">
          {isValid && (
            <ResetPassword token={token} />
          )}
        </div>
      </main>
  )
}

export default ResetPasswordPage

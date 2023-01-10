import { useGlobal } from '../../contexts/Global'

import { useState, useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../../api'
import { Spin } from 'antd'

const VerifyPage = () => {
  // Search Params
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  // Navigator
  const navigate = useNavigate()

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Local States
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('Sedang memverifikasi...')

  useEffect(() => {
    // Verify token
    const verifyToken = async () => {
      setLoading(true)
      await api.get(`/auth/verify?token=${token}`)
        .then(res => {
          mySwal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message,
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            navigate('/auth')
          })
        })
        .catch(err => {
          console.log(err)
          mySwal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response.data.message,
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            setText(err.response.data.message)
          })
        })
      setLoading(false)
    }

    verifyToken()
  }, [])

  return (
    <main className="min-h-screen flex flex-col px-5 py-2 bg-gray-800 items-center justify-center space-y-10 text-white">
      <p className="font-bold text-xl md:text-2xl lg:text-3xl text-center tracking-wide">
        {text}
      </p>
      <div className="flex flex-col w-[90%] md:w-[70%] lg:w-[35%] space-y-2">
        <Spin spinning={loading} size="large" />
      </div>
    </main>
  )
}

export default VerifyPage

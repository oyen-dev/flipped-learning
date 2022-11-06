import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/Auth'

import api from '../../api'
import Layout from '../../components/layouts'
import { EditUser } from '../../components/forms'
import { Breadcrumb } from '../../components/breadcrumb'
import { useNavigate } from 'react-router-dom'

import { Image, Button, message, Upload, Skeleton } from 'antd'
import ImgCrop from 'antd-img-crop'
import { UploadOutlined } from '@ant-design/icons'
import Cookies from 'js-cookie'

import FallBack from '../../assets/images/profile.png'

const EditProfilePage = () => {
  // Navigator
  const navigate = useNavigate()

  // Auth Functions
  const { authFunctions } = useAuth()
  const { fetchUser } = authFunctions

  // Local States
  const [userData, setUserData] = useState(null)
  const [fileList, setFileList] = useState([])
  const [fetch, setFetch] = useState(false)

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Edit Profile',
      destination: '/profile'
    }
  ]

  // Fetching student data
  const getUserDetails = async () => {
    // Configuration
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api.get('/users/profile', config)
      .then((res) => {
        // console.log(res)
        setUserData(res.data.data)
      })
  }

  // Custom upload image request
  const uploadImage = async options => {
    const { onSuccess, onError, file } = options

    const fmData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }
    fmData.append('files', file)
    try {
      await api.post('/users/picture', fmData, config)
      onSuccess('Ok')
      setFetch(true)
      fetchUser()
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    }
  }

  // Upload Configuration
  const uploadProps = {
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      setFileList(file)
      return isJpgOrPng && isLt2M
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList)
    },
    onPreview: async (file) => {
      let src = file.url
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj)
          reader.onload = () => resolve(reader.result)
        })
      }
      const image = new Image()
      image.src = src
      const imgWindow = window.open(src)
      imgWindow.document.write(image.outerHTML)
    },
    customRequest: uploadImage
  }

  // Initail fetch data
  useEffect(() => {
    getUserDetails()
  }, [])

  // Fetch data after update
  useEffect(() => {
    if (fetch) {
      getUserDetails()
      setFetch(false)
    }
  }, [fetch])

  return (
    <Layout>
        <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full rounded-lg py-2 px-2 text-black dark:text-white bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <h5 className="font-semibold text-lg text-center mb-0 text-black dark:text-white transition-all ease-in-out duration-300">
            Edit Profil
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full text-white items-center justify-start py-5 space-y-4 lg:space-y-0 overflow-auto">
            <div className="flex flex-col space-y-5 w-full lg:w-1/3 h-full items-center justify-center">
              {userData
                ? (
                <>
                  <Image src={userData.picture} className="h-[80%] w-[60%]" fallback={FallBack}/>
                  <ImgCrop rotate>
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Update Picture Profile</Button>
                    </Upload>
                  </ImgCrop>
                </>
                  )
                : (
                  <Skeleton.Image active className='w-full h-full' />
                  )}
            </div>
            <div className="flex flex-col items-start justify-start w-full lg:w-2/3 h-full p-2 space-y-4">
              <EditUser student={userData} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EditProfilePage

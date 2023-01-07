import { EditStudent } from '../forms'

import { Image, message, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const UpdateUser = () => {
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },

    onChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <div className="modal backdrop-blur-sm w-full h-screen">
      <div className="modal-box h-[70%] w-11/12 max-w-5xl bg-gray-900">
        <div className="flex w-full justify-center items-center h-10 sticky top-0 left-0 z-40">
          <label
            htmlFor="my-modal-update"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </label>
          <h5 className="font-semibold text-lg text-center mb-0 text-white">
            Data Profil Siswa
          </h5>
        </div>
        <div className="flex flex-col w-full h-[90%]">
          <div className="flex flex-col lg:flex-row w-full text-white items-start justify-start py-5 space-y-4 lg:space-y-0 overflow-auto">
            <div className="flex flex-col w-full lg:w-1/3 space-y-4 items-center justify-center">
              <Image src="/images/pass.png" className="h-[80%] w-[60%]" />

              <div className="flex flex-col items-center justify-center w-full overflow-auto">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Ubah Foto Profil</Button>
                </Upload>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full h-full p-2 space-y-4">
              <EditStudent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser

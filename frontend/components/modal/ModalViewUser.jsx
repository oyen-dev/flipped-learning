import { Image, Select } from 'antd'

const ModalViewUser = () => {
  return (
    <div className="modal backdrop-blur-sm w-full">
      <div className="modal-box w-11/12 max-w-5xl bg-gray-800">
        <label
          htmlFor="my-modal-view"
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
        <h5 className="font-semibold text-lg text-center text-white">
          Data Profil Siswa
        </h5>
        <div className="flex flex-col lg:flex-row w-full h-full text-white items-start justify-center p-2 space-y-4 lg:space-y-0">
          <div className="flex w-full lg:w-1/3 h-full items-center justify-center">
            <Image src="/images/pass.png" />
          </div>
          <div className="flex flex-col items-start justify-start w-full lg:w-2/3 h-full p-2 space-y-4">
            <Field label="Nama" value="Catharina Novi Putri" />
            <Field label="Kelas" value="XI - Multimedia" />
            <Field label="Email" value="riinnaa21@gmail.com" />
            <Field label="No Telp" value="085 736 822 725" />
            <Field label="Alamat" value="Jl. Durian 25" />
            <Enrolled label="Kelas Diikuti" value={['Teknik Audio Video', 'Pemrograman Web', 'Desain Grafis', 'Dasar-dasar Keahlian Program']} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Field = ({ label, value }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full items-center justify-center">
      <div className="flex w-full lg:w-1/6 justify-center lg:justify-start">
        <p className="text-base mb-0">{label}</p>
      </div>

      <div className="flex w-full lg:w-5/6 justify-center lg:justify-start">
        <p className="text-lg font-semibold text-center lg:text-left mb-0">
          {value}
        </p>
      </div>
    </div>
  )
}

const Enrolled = ({ label, value }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center">
      <div className="flex w-full lg:w-1/6 justify-center lg:justify-start">
        <p className="text-base mb-0">{label}</p>
      </div>

      <div className="flex flex-col w-full space-y-4 lg:w-5/6 justify-center lg:justify-start mt-2 lg:mt-0">
      <Select
      mode="multiple"
      disabled
      style={{
        width: '100%'
      }}
      placeholder="Please select"
      defaultValue={value}
    >
    </Select>
      </div>
    </div>
  )
}

export default ModalViewUser

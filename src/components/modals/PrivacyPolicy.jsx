import { useState } from 'react'
import { BsXLg } from 'react-icons/bs'

const PrivacyPolicy = () => {
  // Local states
  const [policy] = useState([
    'Pengguna harus memiliki akun yang sah dan terdaftar untuk dapat mengakses fitur dan fungsi aplikasi ini.',
    'Pengguna harus menaati semua peraturan yang ditentukan oleh sekolah atau institusi pendidikan yang diterapkan dalam penggunaan aplikasi ini.',
    'Pengguna harus menjaga kerahasiaan akun dan kata sandi mereka, dan tidak diperbolehkan untuk memberikan akses ke akun mereka kepada pihak ketiga.',
    'Pengguna bertanggung jawab atas segala bentuk aktivitas yang dilakukan di akun mereka, dan pengembang aplikasi tidak bertanggung jawab atas kerugian yang diakibatkan oleh penyalahgunaan akun oleh pihak ketiga.'
  ])
  const [privacy] = useState([
    'Aplikasi ini hanya akan mengumpulkan informasi yang diperlukan untuk menyediakan fitur dan fungsi yang ditentukan, seperti nama pengguna, alamat email, dan informasi akun sekolah.',
    'Informasi yang dikumpulkan akan digunakan untuk menyediakan dan meningkatkan layanan yang ditawarkan melalui aplikasi, serta untuk mengelola akun pengguna.',
    'Aplikasi ini mungkin menggunakan cookie dan teknologi lain untuk meningkatkan pengalaman pengguna dan untuk mengumpulkan data analitik. Pengguna dapat menonaktifkan cookie melalui pengaturan browser mereka.'
  ])

  return (
    <div className="modal w-full">
      <div className="modal-box w-11/12 max-w-5xl relative bg-gray-800">
        <label
          htmlFor="modal-privacy-policy"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          <BsXLg />
        </label>

        <div className="flex flex-col w-full h-full text-white">
          <h1 className="text-xl font-bold text-white text-center mb-0 pb-3">
            Ketentuan Penggunaan dan Kebijakan Privasi
          </h1>
          <div className="flex flex-col w-full bg-gray-700 px-5 py-5 rounded-lg gap-2">
            <p className="mb-0 text-sm font-normal text-justify">
              Aplikasi Pembelajaran ini ditujukan untuk digunakan oleh siswa,
              guru, dan administrator sekolah. Dalam penggunaannya, pengguna
              harus memenuhi ketentuan berikut:
            </p>
            <ul className="list-disc ml-3">
              {policy.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <p className="mb-0 text-sm font-normal text-justify">
              Selain itu, Aplikasi Pembelajaran ini juga menerapkan kebijakan
              privasi yang menjamin perlindungan atas informasi yang dikumpulkan
              dari pengguna. Ketentuan-ketentuan dalam kebijakan privasi ini
              antara lain:
            </p>
            <ul className="list-disc ml-3">
              {privacy.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

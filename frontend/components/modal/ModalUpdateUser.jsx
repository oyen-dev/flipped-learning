const ModalUpdateUser = () => {
  return (
    <div className="modal backdrop-blur-sm">
      <div className="modal-box relative bg-gray-800">
        <label htmlFor="my-modal-update" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h1 className="font-semibold text-lg text-center text-white">Update data user</h1>
        <p className="text-base font-normal mb-2">Nama Lengkap</p>
        <input className="appearance-none border-2 border-gray-200 w-full mb-4 py-2 px-4 leading-tight focus:outline-none focus:border-purple-500 text-black text-lg font-medium rounded-md pl-2" id="fullname" placeholder="Budi Santoso" type="text" name="fullname" />

        <p className="text-base font-normal mb-2">Nomor Telepon</p>
        <input className="appearance-none border-2 border-gray-200 w-full mb-4 py-2 px-4 leading-tight focus:outline-none focus:border-purple-500 text-black text-lg font-medium rounded-md pl-2" id="phonenumber" placeholder="085734568876" type="text" name="phonenumber" />

        <p className="text-base font-normal mb-2">Email</p>
        <input className="appearance-none border-2 border-gray-200 w-full mb-4 py-2 px-4 leading-tight focus:outline-none focus:border-purple-500 text-black text-lg font-medium rounded-md pl-2" id="email" placeholder="budisan@gmail.com" type="text" name="email" />

        <p className="text-base font-normal mb-2">Role</p>
        <div className="flex">
          <input type="radio" name="radio-2" className="radio radio-primary" /><span className="w-2/6 px-4 appearance-none leading-normal text-white text-lg font-medium rounded-md pl-2">Guru</span>
          <input type="radio" name="radio-2" className="radio radio-primary" /><span className="w-2/6 px-4 appearance-none leading-normal text-white text-lg font-medium rounded-md pl-2">Siswa</span>
        </div>
        <div className='flex justify-center mt-8'>
          <button type="button" className="btn btn-sm bg-[#34A0A4]">
            <p className='font-medium text-lg text-white mb-0'>Simpan</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalUpdateUser

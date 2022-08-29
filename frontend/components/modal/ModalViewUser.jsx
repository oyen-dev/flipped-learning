const ModalViewUser = () => {
  return (
    <div className="modal backdrop-blur-sm">
      <div className="modal-box relative bg-gray-800">
        <label htmlFor="my-modal-view" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h1 className="font-semibold text-lg text-center text-white">Lihat data user</h1>
        <p className="text-base font-normal">Nama Lengkap</p>
        <p className="text-lg font-medium">Budi Santoso</p>
        <p className="text-base font-bold">Nomor Telepon</p>
        <p className="text-lg font-medium">085734568876</p>
        <p className="text-base font-bold">Email</p>
        <p className="text-lg font-medium">budisan@gmail.com</p>
        <p className="text-base font-bold">Role</p>
        <p className="text-lg font-medium">Guru</p>
      </div>
    </div>
  )
}

export default ModalViewUser

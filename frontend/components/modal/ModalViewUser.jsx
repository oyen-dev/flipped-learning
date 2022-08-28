const ModalViewUser = () => {
  return (
    <div className="modal backdrop-blur-sm">
      <div className="modal-box relative bg-gray-800">
        <label htmlFor="my-modal-view" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h1 className="text-4xl font-bold text-center text-white">Lihat data user</h1>
        <p className="text-base font-normal">Nama Lengkap</p>
        <p className="text-2xl font-medium">Budi Santoso</p>
        <p className="text-base font-bold">Nomor Telepon</p>
        <p className="text-2xl font-medium">085734568876</p>
        <p className="text-base font-bold">Email</p>
        <p className="text-2xl font-medium">budisan@gmail.com</p>
        <p className="text-base font-bold">Role</p>
        <p className="text-2xl font-medium">Guru</p>
      </div>
    </div>
  )
}

export default ModalViewUser

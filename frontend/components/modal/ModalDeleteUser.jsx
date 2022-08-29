const ModalDeleteUser = () => {
  return (
        <div className="modal backdrop-blur-sm">
            <div className="modal-box relative bg-gray-800">
                <label htmlFor="my-modal-delete" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h1 className="text-4xl font-bold text-center text-white">Konfirmasi Hapus</h1>
                <p className="text-base text-center font-normal">Apakah Anda yakin ingin menghapus data Budi Santoso?</p>

                <div className="flex justify-center gap-16">
                    <button className="btn btn-sm btn-accent w-2/6">Batal</button>
                    <button className="btn btn-sm bt-[#34A0A4] w-2/6">Hapus</button>
                </div>
            </div>
        </div>
  )
}

export default ModalDeleteUser

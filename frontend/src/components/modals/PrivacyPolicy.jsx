const PrivacyPolicy = () => {
  return (
    <div className="modal w-full">
      <div className="modal-box w-11/12 max-w-5xl relative bg-gray-800">
        <label
          htmlFor="modal-privacy-policy"
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

        <div className="flex flex-col w-full h-full text-white">
          <h1 className="text-xl font-bold text-white text-center mb-0 pb-3">
            Ketentuan Penggunaan
          </h1>
          <div className="flex flex-col w-full bg-gray-700 px-5 py-5 rounded-lg gap-5">
            <p className="text-sm font-normal text-justify">
              Izin Terbatas dan Akses terhadap Situs - Pemilik dengan ini
              memberikan Anda izin terbatas untuk mengakses dan menggunakan
              secara pribadi Situs Web ini tetapi Anda tidak diizinkan untuk
              mengunduh (di luar penembolokan halaman/page caching) atau
              memodifikasi seluruh atau sebagian dari Situs Web ini kecuali
              dengan persetujuan tertulis dari Pemilik. Izin ini tidak termasuk
              penjualan kembali atau penggunaan komersial Situs Web ini atau
              isinya; pengambilan atau penggunaan daftar produk, deskripsi, atau
              harganya, penggunaan lanjutan dari Situs Web ini atau isinya, atau
              penggunaan alat penambangan data (data mining), robot, atau
              pengumpul dan pengekstraksi data sejenis. Seluruh atau sebagian
              dari Situs Web ini tidak boleh direproduksi, diduplikasi, disalin,
              dijual, dijual kembali, dikunjungi, atau dimanfaatkan untuk tujuan
              komersial tanpa persetujuan tertulis dari Pemilik. Anda tidak
              diperkenankan mem-frame atau menggunakan teknik framing untuk
              menyertakan setiap merek dagang, logo, atau informasi berpemilik
              lainnya (termasuk gambar, teks, tata letak halaman, atau bentuk)
              yang menjadi milik Pemilik dan afiliasinya tanpa persetujuan
              tertulis yang jelas dari mereka. Anda tidak diperkenankan
              menggunakan “meta-tag” atau “teks tersembunyi” lainnya yang
              menggunakan nama (berbagai nama) Chubb atau merek jasa apapun
              tanpa persetujuan tertulis dari para Pemilik. Setiap penggunaan
              yang tidak diperkenankan akan mengakhiri persetujuan atau izin
              yang diberikan oleh Pemilik.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy

const PostHeader = () => {
  return (
    <div className="flex flex-row space-x-4 justify-start items-center w-full">
      <img
        src="https://ui-avatars.com/api/?name=Anandia&size=300"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col w-full items-start justify-center">
        <h5 className="mb-0 text-black dark:text-white ">Pertemuan 1 - Jenis Format Video</h5>
        <span className="mb-0 text-black dark:text-white ">Senin, 5 Januari 2022</span>
      </div>
    </div>
  )
}

export default PostHeader

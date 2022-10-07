import { useState, useEffect } from 'react'

import { useGlobal } from '../../contexts/Global'
import { useManagement } from '../../contexts/Management'
import api from '../../api'

import { FilterOption } from '../../components/input'
import { Class } from '../../components/card'
import { CreateClass } from '../../components/modals'

import { Input, Button, Pagination } from 'antd'

const ActiveClass = () => {
  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const { classList, setClassList } = managementStates

  // Local States
  const [totalClass, setTotalClass] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitClass, setLimitClass] = useState(10)
  const [isFetch, setIsFetch] = useState(false)

  // Control filter and search input
  const [search, setSearch] = useState('')

  const onShowSizeChange = (current, pageSize) => {
    // console.log('set limit to', pageSize)
    setLimitClass(pageSize)
  }

  const onChange = (page) => {
    // console.log('move to page', page)
    setCurrentPage(page)
    setIsFetch(true)
  }

  const destructureMeta = (meta) => {
    const { limit, totalPages, page } = meta
    // Set management states
    setTotalClass(limit * totalPages)
    setCurrentPage(totalPages)
    setCurrentPage(page)
  }

  const fetchClass = async (page, limit) => {
    mySwal.fire({
      html: 'Wait a moment...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })
    if (page === 0 || limit === 0) {
      page = 1
      limit = 10
    }

    const endpoint =
      search !== ''
        ? `/classes?q=${search}&page=${page}&limit=${limit}`
        : `/classes?page=${page}&limit=${limit}`

    await api.get(endpoint).then((res) => {
      // console.log(res)
      // Destructure meta
      destructureMeta(res.data.meta)

      // Set list of class
      setClassList(res.data.data)
    })
    mySwal.close()
  }

  // Initial fetch data
  useEffect(() => {
    fetchClass(1, 10)
    // console.log('init')
  }, [])

  // Fetch data when page change or limit change
  useEffect(() => {
    if (isFetch) {
      fetchClass(currentPage, limitClass)
      setIsFetch(false)
    }
  }, [isFetch])

  // Search classes
  const searchClass = async () => {
    mySwal.fire({
      html: 'Wait a moment...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })
    fetchClass(currentPage, limitClass)
    mySwal.close()
  }

  // Fetch class when search input is empty
  useEffect(() => {
    if (search === '') {
      fetchClass(1, 10)
    }
  }, [search])

  // Todo : Filter class
  return (
    <>
      <div className="flex flex-col w-full items-center md:items-end justify-between space-y-4">
        <div className="flex flex-col md:flex-row w-full md:w-2/5 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <Input
              placeholder="Cari Kelas"
              prefix={<SearchIcon />}
              onChange={(e) => setSearch(e.target.value)}
              allowClear={true}
            />
            <Button
              type="primary"
              disabled={!!(search === '' || search === null)}
              onClick={searchClass}
            >
              Cari Kelas
            </Button>
          </div>
          <FilterOption />
        </div>
        {classList.length !== 0 && (
          <div className="flex w-full justify-end">
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              defaultCurrent={currentPage}
              total={totalClass}
            />
          </div>
        )}
      </div>
      {classList.length === 0
        ? (
        <div className="flex flex-col w-full items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-emoji-frown fill-gray-500"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
          </svg>
          <p className="text-gray-500 pt-3">Tidak ada kelas ditemukan.</p>
        </div>
          )
        : null}
      <div className="grid w-full auto-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
        {classList.map((kelas) => (
          <Class key={kelas._id} title={kelas.name} clases={kelas.class} />
        ))}
      </div>

      <label
        htmlFor="modal-create-class"
        className="modal-button fixed z-40 bottom-8 right-8 bg-[#34A0A4] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center cursor-pointer text-white text-4xl hover:bg-[#7C3AED] hover:drop-shadow-2xl duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
          />
        </svg>
      </label>

      {/* Modal container */}
      <input
        type="checkbox"
        id="modal-create-class"
        className="modal-toggle"
      />
      <CreateClass />
    </>
  )
}

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  )
}

export default ActiveClass

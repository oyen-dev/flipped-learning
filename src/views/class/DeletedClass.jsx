import { useState, useEffect } from 'react'

import { useManagement } from '../../contexts/Management'
import api from '../../api'

import { Class } from '../../components/card'
import { CreateClass } from '../../components/modals'
import { Empty } from '../../pages/error'

import { BsPlus, BsSearch } from 'react-icons/bs'
import { Input, Button, Pagination, Spin } from 'antd'
import Cookies from 'js-cookie'

const DeletedClass = () => {
  // Management States
  const { managementStates } = useManagement()
  const { classList, setClassList, isFetchClass, setIsFetchClass } = managementStates

  // Local States
  const [totalClass, setTotalClass] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitClass, setLimitClass] = useState(10)
  // const [isFetchClass, setIsFetchClass] = useState(false)
  const [currentSearchPage, setCurrentSearchPage] = useState(1)

  // Control filter and search input
  const [search, setSearch] = useState('')

  const onShowSizeChange = (current, pageSize) => {
    // console.log('set limit to', pageSize)
    setLimitClass(pageSize)
  }

  const onChange = (page) => {
    // console.log('move to page', page)
    setCurrentPage(page)
    setIsFetchClass(true)

    // Reset search page
    if (search !== '') {
      setCurrentSearchPage(page)
    }
  }

  const destructureMeta = (meta) => {
    const { limit, totalPages, page } = meta
    // Set management states
    setTotalClass(limit * totalPages)
    setCurrentPage(totalPages)
    setCurrentPage(page)
  }

  const fetchClass = async (page, limit) => {
    if (page === 0 || limit === 0) {
      page = 1
      limit = 10
    }

    const endpoint =
      search !== ''
        ? `/class?q=${search}&page=${currentSearchPage}&limit=${limit}&deleted=true&archived=true`
        : `/class?page=${page}&limit=${limit}&deleted=true&archived=true`

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const res = await api.get(endpoint, config)
      // console.log(res)
      // Destructure meta
      destructureMeta(res.data.meta)

      // Set list of class
      setClassList(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Search classes
  const searchClass = async () => {
    fetchClass(currentPage, limitClass)
  }

  // Initial fetch data
  useEffect(() => {
    // Reset classList
    setClassList(null)

    fetchClass(1, 10)
    // console.log('init')
  }, [])

  // Fetch data when page change or limit change
  useEffect(() => {
    // Reset classList
    setClassList(null)

    if (isFetchClass) {
      fetchClass(currentPage, limitClass)
      setIsFetchClass(false)
    }
  }, [isFetchClass])

  // Fetch class when search input is empty
  useEffect(() => {
    if (search === '') {
      setClassList(null)
      fetchClass(1, 10)
      setCurrentSearchPage(1)
    }
  }, [search])

  // Todo : Filter class
  return (
    <div className="flex flex-col px-4 py-4 w-full items-center bg-[#accbe1] dark:bg-gray-900 md:items-end rounded-lg justify-between space-y-4 transition-all ease-in-out duration-300">
      <div className="flex flex-col w-full items-end justify-center space-y-4">
        <div className="flex flex-row space-x-4">
          <Input
            placeholder="Nama Kelas"
            prefix={<BsSearch />}
            onChange={(e) => setSearch(e.target.value)}
            onPressEnter={searchClass}
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

        {classList !== null && classList.length > 0 && (
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            defaultCurrent={currentPage}
            total={totalClass}
          />
        )}

      </div>

      <div className="flex flex-col w-full items-center justify-center">
        {classList === null
          ? <Spin size="default" />
          : classList.length === 0
            ? <Empty message="Tidak ada data kelas ditemukan." />
            : <div className="grid w-full auto-rows-auto md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
                {classList.map((kelas) => {
                  const { gradeId, name, schedule, _id, cover } = kelas
                  return (
                    <Class
                      key={_id}
                      path={_id}
                      title={name}
                      clases={gradeId.name}
                      schedule={schedule}
                      cover={cover}
                      mode="deleted"
                      admin={true}
                    />
                  )
                })}
              </div>
        }
      </div>

      <label
        htmlFor="modal-create-class"
        className="modal-button fixed z-40 bottom-8 right-8 bg-[#34A0A4] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center cursor-pointer text-white text-4xl hover:bg-[#7C3AED] hover:drop-shadow-2xl duration-300"
      >
        <BsPlus />
      </label>

      {/* Modal container */}
      <input type="checkbox" id="modal-create-class" className="modal-toggle" />
      <CreateClass />
    </div>
  )
}

export default DeletedClass

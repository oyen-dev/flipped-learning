import { useState, useEffect } from 'react'
import { useGlobal } from '../../../contexts/Global'
import { useManagement } from '../../../contexts/Management'
import api from '../../../api'

import Layout from '../../../components/layouts'
import { Breadcrumb } from '../../../components/breadcrumb'
import { Teachers } from '../../../components/tables'
import { CreateUser } from '../../../components/modals'

import { useNavigate } from 'react-router-dom'
import { Input, Pagination, Button } from 'antd'
import Cookies from 'js-cookie'

const ManagementTeacherPage = () => {
  // Local States
  const [totalTeacher, setTotalTeacher] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitTeacher, setLimitTeacher] = useState(10)
  const [currentSearchPage, setCurrentSearchPage] = useState(1)

  // Control filter and search input
  const [search, setSearch] = useState('')

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const { teacherList, setTeacherList, isFetchTeacher, setIsFetchTeacher } = managementStates

  // Navigator
  const navigate = useNavigate()

  // Breadcrumb Items
  const paths = [
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Manajemen Data Guru',
      destination: '/management/teachers'
    }
  ]

  // Fetch teacher data
  const fetchTeachers = async (page, limit) => {
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

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    const endpoint =
      search !== ''
        ? `/users/teachers?q=${search}&page=${currentSearchPage}&limit=${limitTeacher}`
        : `/users/teachers?page=${currentPage}&limit=${limitTeacher}`

    const res = await api.get(endpoint, config)
    // console.log(res)

    // Destructure meta
    const { data: { data: { teachers }, meta } } = res
    destructureMeta(meta)

    // Set list of class
    setTeacherList(mapTeacherData(teachers))
    mySwal.close()
  }

  const destructureMeta = (meta) => {
    const { limit, totalPages, page, count } = meta
    // Set management states
    setTotalTeacher(count)
    setCurrentPage(totalPages)
    setCurrentPage(page)
    setLimitTeacher(limit)
  }

  const mapTeacherData = (teachers) => {
    return teachers.map((teacher, index) => {
      const { _id, fullName, email } = teacher
      return {
        key: _id,
        no: index + 1,
        name: fullName,
        email
      }
    })
  }

  const onShowSizeChange = (current, pageSize) => {
    console.log('set limit to', pageSize)
    setLimitTeacher(pageSize)
  }

  const onChange = (page) => {
    console.log('move to page', page)
    setCurrentPage(page)
    setIsFetchTeacher(true)

    // Reset search page
    if (search !== '') {
      setCurrentSearchPage(page)
    }
  }

  // Search classes
  const searchTeacher = async () => {
    mySwal.fire({
      html: 'Wait a moment...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })
    fetchTeachers(currentPage, limitTeacher)
    mySwal.close()
  }

  // Initial fetch
  useEffect(() => {
    fetchTeachers(1, 10)
  }, [])

  // Fetch teacher data when fetch state is true
  useEffect(() => {
    if (isFetchTeacher) {
      fetchTeachers(currentPage, limitTeacher)
      setIsFetchTeacher(false)
    }
  }, [isFetchTeacher])

  // Fetch teacher when search is empty
  useEffect(() => {
    if (search === '') {
      fetchTeachers(1, 10)
      setCurrentSearchPage(1)
    }
  }, [search])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full items-center lg:items-start justify-start bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
        <div className="flex flex-col w-full items-start justify-start overflow-x-auto space-y-4">
          <div className="flex flex-col w-full items-end justify-center space-y-4">
            <div className="flex flex-row space-x-4">
              <Input
                placeholder="Nama Guru"
                prefix={<SearchIcon />}
                onChange={(e) => setSearch(e.target.value)}
                allowClear={true}
              />
              <Button
                type="primary"
                disabled={!!(search === '' || search === null)}
                onClick={searchTeacher}
              >
                Cari Guru
              </Button>
            </div>
            {teacherList.length > 0 && (
              <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              defaultCurrent={currentPage}
              total={totalTeacher}
            />
            )}
          </div>
          {teacherList.length === 0
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
            <p className="text-gray-500 pt-3">Tidak ada siswa ditemukan.</p>
          </div>
              )
            : <Teachers teachers={teacherList} />}
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
      </div>

      {/* Button Add Teacher */}
      <label
        htmlFor="my-modal-create"
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

      {/* Container Modal */}
      <input type="checkbox" id="my-modal-create" className="modal-toggle" />
      <CreateUser mode="student" />
    </Layout>
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

export default ManagementTeacherPage

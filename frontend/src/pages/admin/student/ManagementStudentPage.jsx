import { useState, useEffect } from 'react'
import { useGlobal } from '../../../contexts/Global'
import { useManagement } from '../../../contexts/Management'
import api from '../../../api'

import Layout from '../../../components/layouts'
import { Student } from '../../../components/tables'
import { CreateUser } from '../../../components/modals'

import { Input, Pagination, Button } from 'antd'
import Cookies from 'js-cookie'

const ManagementStudentPage = () => {
  // Local States
  const [fetch, setFetch] = useState(false)
  const [totalStudent, setTotalStudent] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitStudent, setLimitStudent] = useState(10)
  const [currentSearchPage, setCurrentSearchPage] = useState(1)

  // Control filter and search input
  const [search, setSearch] = useState('')

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const { studentList, setStudentList } = managementStates

  // Fetch student data
  const fetchStudents = async (page, limit) => {
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
        ? `/users/students?q=${search}&page=${currentSearchPage}&limit=${limitStudent}`
        : `/users/students?page=${currentPage}&limit=${limitStudent}`

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    await api
      .get(endpoint, config)
      .then((res) => {
        const {
          data: {
            data: { students },
            meta
          }
        } = res
        // Destructure meta
        destructureMeta(meta)

        // Set list of class
        setStudentList(mapStudentData(students))
      })
      .then(() => {
        mySwal.close()
      })
  }

  const destructureMeta = (meta) => {
    const { limit, totalPages, page, count } = meta
    // Set management states
    setTotalStudent(count)
    setCurrentPage(totalPages)
    setCurrentPage(page)
    setLimitStudent(limit)
  }

  const mapStudentData = (students) => {
    return students.map((student, index) => {
      const { _id, fullName, email } = student
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
    setLimitStudent(pageSize)
  }

  const onChange = (page) => {
    console.log('move to page', page)
    setCurrentPage(page)
    setFetch(true)

    // Reset search page
    if (search !== '') {
      setCurrentSearchPage(page)
    }
  }

  // Search classes
  const searchStudent = async () => {
    mySwal.fire({
      html: 'Wait a moment...',
      didOpen: () => {
        mySwal.showLoading()
      }
    })
    fetchStudents(currentPage, limitStudent)
    mySwal.close()
  }

  // Initial fetch
  useEffect(() => {
    fetchStudents(1, 10)
    console.log('init')
  }, [])

  // Fetch student data when fetch state is true
  useEffect(() => {
    if (fetch) {
      fetchStudents(currentPage, limitStudent)
      setFetch(false)
    }
  }, [fetch])

  // Fetch student when search is empty
  useEffect(() => {
    if (search === '') {
      fetchStudents(1, 10)
      setCurrentSearchPage(1)
    }
  }, [search])
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row w-full h-full items-end lg:items-center justify-end space-y-4 lg:space-y-0">
        <label
          htmlFor="my-modal-create"
          className="btn btn-sm bg-[#34A0A4] modal-button border-none hover:bg-blue-700 hover:drop-shadow-2xl duration-300"
        >
          <p className="font-medium capitalize text-sm text-white mb-0">
            Tambah Siswa
          </p>
        </label>

        <input type="checkbox" id="my-modal-create" className="modal-toggle" />
        <CreateUser mode="student" />
      </div>

      <div className="flex flex-col w-full items-center lg:items-start justify-start bg-[#accbe1] dark:bg-gray-900 transition-all ease-in-out duration-300 px-5 py-5 rounded-lg">
        <div className="flex flex-col w-full items-start justify-start overflow-x-auto space-y-4">
          <div className="flex flex-col md:flex-row w-full md:w-2/5 space-x-0 md:space-x-4 space-y-4 md:space-y-0"></div>
          <div className="flex flex-col w-full items-end justify-center space-y-4">
            <div className="flex flex-row space-x-4">
              <Input
                placeholder="Nama Siswa"
                prefix={<SearchIcon />}
                onChange={(e) => setSearch(e.target.value)}
                allowClear={true}
              />
              <Button
                type="primary"
                disabled={!!(search === '' || search === null)}
                onClick={searchStudent}
              >
                Cari Siswa
              </Button>
            </div>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              defaultCurrent={currentPage}
              total={totalStudent}
            />
          </div>
          {/* <Students students={studentList} /> */}
          <Student students={studentList} />
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
      </div>
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

export default ManagementStudentPage

import { useState, useEffect } from 'react'
import { useGlobal } from '../../../contexts/Global'
import { useManagement } from '../../../contexts/Management'
import api from '../../../api'

import Layout from '../../../components/layouts'
import { Breadcrumb } from '../../../components/breadcrumb'
import { Teachers } from '../../../components/tables'
import { CreateUser } from '../../../components/modals'
import { Empty } from '../../error'

import { useNavigate } from 'react-router-dom'
import { Input, Pagination, Button, Select } from 'antd'
import { BsPlus, BsSearch } from 'react-icons/bs'
import Cookies from 'js-cookie'

const ManagementTeacherPage = () => {
  // Local States
  const [totalTeacher, setTotalTeacher] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limitTeacher, setLimitTeacher] = useState(10)
  const [currentSearchPage, setCurrentSearchPage] = useState(1)
  const [filterTeacher, setFilterTeacher] = useState(false)

  // Control filter and search input
  const [search, setSearch] = useState('')

  // Global Functions
  const { globalFunctions } = useGlobal()
  const { mySwal } = globalFunctions

  // Management States
  const { managementStates } = useManagement()
  const { teacherList, setTeacherList, isFetchTeacher, setIsFetchTeacher } =
    managementStates

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
      search !== '' && filterTeacher
        ? `/users/teachers?q=${search}&page=${currentSearchPage}&limit=${limitTeacher}&deleted=true`
        : search !== ''
          ? `/users/teachers?q=${search}&page=${currentSearchPage}&limit=${limitTeacher}`
          : filterTeacher
            ? `/users/teachers?page=${currentPage}&limit=${limitTeacher}&deleted=true`
            : `/users/teachers?page=${currentPage}&limit=${limitTeacher}`

    const res = await api.get(endpoint, config)
    // console.log(res)

    // Destructure meta
    const {
      data: {
        data: { teachers },
        meta
      }
    } = res
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
      const { _id, fullName, email, isDeleted, willBeDeletedAt } = teacher
      return {
        key: _id,
        no: index + 1,
        name: fullName,
        email,
        isDeleted,
        willBeDeletedAt
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

  const handleFilterChange = (value) => {
    if (value === undefined) setFilterTeacher(false)
    else setFilterTeacher(value)
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

  // Fetch teacher data when filter state change
  useEffect(() => {
    fetchTeachers(1, 10)
  }, [filterTeacher])

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
                prefix={<BsSearch />}
                onChange={(e) => setSearch(e.target.value)}
                onPressEnter={searchTeacher}
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
            <Select
              allowClear
              placeholder="Filter Data Guru"
              onChange={(e) => handleFilterChange(e)}
            >
              <Select.Option value={false}>Aktif</Select.Option>
              <Select.Option value={true}>Dihapus</Select.Option>
            </Select>
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
            <Empty message="Tidak ada data guru ditemukan." />
              )
            : (
            <Teachers teachers={teacherList} />
              )}
          <div className="flex w-full mt-5 lg:mt-0 justify-center items-center" />
        </div>
      </div>

      {/* Button Add Teacher */}
      <label
        htmlFor="my-modal-create"
        className="modal-button fixed z-40 bottom-8 right-8 bg-[#34A0A4] w-12 h-12 rounded-full drop-shadow-lg flex justify-center items-center cursor-pointer text-white text-4xl hover:bg-[#7C3AED] hover:drop-shadow-2xl duration-300"
      >
        <BsPlus />
      </label>

      {/* Container Modal */}
      <input type="checkbox" id="my-modal-create" className="modal-toggle" />
      <CreateUser mode="teacher" />
    </Layout>
  )
}

export default ManagementTeacherPage

import { useState, useEffect } from 'react'

import api from '../../api'
import Layout from '../../components/layouts'
import { Breadcrumb } from '../../components/breadcrumb'
import { ResultList } from '../../views/class'

import Cookies from 'js-cookie'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Spin } from 'antd'

const EvaluationResult = () => {
  // useParams
  const { id: classId, evaluationId } = useParams()

  // useLocation
  const { pathname } = useLocation()

  // Navigator
  const navigate = useNavigate()

  // Local States
  const [result, setResult] = useState(null)
  const [paths] = useState([
    {
      name: 'Dashboard',
      destination: '/dashboard'
    },
    {
      name: 'Daftar Kelas',
      destination: '/classes'
    },
    {
      name: 'Detail Kelas',
      destination: `/classes/${classId}`
    },
    {
      name: 'Hasil Evaluasi',
      destination: `${pathname}`
    }
  ])

  // Get Evaluation Result
  const getEvaluationResult = async () => {
    // Config
    const config = {
      headers: {
        authorization: `Bearer ${Cookies.get('jwtToken')}`
      }
    }

    try {
      const { data } = await api.get(
        `/class/${classId}/evaluations/${evaluationId}/result`,
        config
      )
      // console.log(data)

      // Set result
      setResult(data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // Initially get evaluation result
  useEffect(() => {
    getEvaluationResult()
  }, [])
  return (
    <Layout>
      <Breadcrumb paths={paths} navigate={navigate} />
      <div className="flex flex-col w-full px-3 py-3 rounded-lg bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white transition-all ease-in-out duration-300">
        {result === null
          ? <Spin size='default' />
          : <ResultList {...result} />
        }
      </div>
    </Layout>
  )
}

export default EvaluationResult

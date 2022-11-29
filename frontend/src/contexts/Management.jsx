import { createContext, useContext, useState } from 'react'

const ManagementContext = createContext()

export const ManagementProvider = ({ children }) => {
  // Management States
  const [studentList, setStudentList] = useState([])
  const [teacherList, setTeacherList] = useState([])
  const [classList, setClassList] = useState(null)

  // Management Functional States
  const [willUpdateClassId, setWillUpdateClassId] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [presenceClassId, setPresenceClassId] = useState(null)
  const [presenceMode, setPresenceMode] = useState(null)

  // Fetcher
  const [isFetchStudent, setIsFetchStudent] = useState(false)
  const [isFetchTeacher, setIsFetchTeacher] = useState(false)
  const [isFetchClass, setIsFetchClass] = useState(false)

  // Export student state here
  const managementStates = {
    studentList,
    setStudentList,
    teacherList,
    setTeacherList,
    classList,
    setClassList,
    isFetchStudent,
    setIsFetchStudent,
    isFetchTeacher,
    setIsFetchTeacher,
    isFetchClass,
    setIsFetchClass,
    willUpdateClassId,
    setWillUpdateClassId,
    isModalVisible,
    setIsModalVisible,
    presenceClassId,
    setPresenceClassId,
    presenceMode,
    setPresenceMode
  }

  return (
    <ManagementContext.Provider value={{ managementStates }}>
      {children}
    </ManagementContext.Provider>
  )
}

export const useManagement = () => useContext(ManagementContext)

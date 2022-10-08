import { createContext, useContext, useState } from 'react'

const ManagementContext = createContext()

export const ManagementProvider = ({ children }) => {
  // Management States
  const [studentList, setStudentList] = useState([])
  const [teacherList, setTeacherList] = useState([])
  const [classList, setClassList] = useState([])

  // Export student state here
  const managementStates = {
    studentList,
    setStudentList,
    teacherList,
    setTeacherList,
    classList,
    setClassList
  }

  return (
    <ManagementContext.Provider value={{ managementStates }}>
      {children}
    </ManagementContext.Provider>
  )
}

export const useManagement = () => useContext(ManagementContext)
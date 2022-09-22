import { createContext, useContext, useState } from 'react'

import students from '../constants/studentData'

const StateContext = createContext({})

export const ManagementStudentProvider = (props) => {
  const { children } = props

  // Form add student
  const [addStudentForm, setAddStudentForm] = useState({
    fullName: '',
    email: '',
    gender: '',
    dob: '',
    pob: '',
    address: ''
  })

  const [studentData, setStudentData] = useState(students)

  // Export collaboration state here
  const managementstudentStates = {
    addStudentForm,
    setAddStudentForm,
    studentData,
    setStudentData
  }

  return (
    <StateContext.Provider value={{
      managementstudentStates
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const ManagementStudentContext = () => useContext(StateContext)

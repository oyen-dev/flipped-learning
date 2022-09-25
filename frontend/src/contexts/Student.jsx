import { createContext, useContext, useState } from 'react'

const StudentContext = createContext()

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null)

  // Export student state here
  const studentState = {
    student,
    setStudent
  }

  return (
    <StudentContext.Provider value={{ studentState }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => useContext(StudentContext)

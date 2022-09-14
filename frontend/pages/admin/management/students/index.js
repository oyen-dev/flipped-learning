import { ContextProvider } from '../../../../contexts/ContextProvider'
import { ManagementStudentProvider } from '../../../../contexts/ManagementStudent'

import ManagementStudent from '../../../../views/management/students'

const user = () => {
  return (
    <ContextProvider>
      <ManagementStudentProvider>
        <ManagementStudent />
      </ManagementStudentProvider>
    </ContextProvider>
  )
}

export default user

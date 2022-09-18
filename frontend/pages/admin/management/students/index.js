import { ManagementStudentProvider } from '../../../../contexts/ManagementStudent'

import ManagementStudent from '../../../../views/management/students'

const user = () => {
  return (
    <ManagementStudentProvider>
      <ManagementStudent />
    </ManagementStudentProvider>
  )
}

export default user

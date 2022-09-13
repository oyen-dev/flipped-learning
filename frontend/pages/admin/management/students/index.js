import { ContextProvider } from '../../../../contexts/ContextProvider'

import ManagementStudent from '../../../../views/management/students'

const user = () => {
  return (
    <ContextProvider>
      <ManagementStudent />
    </ContextProvider>
  )
}

export default user

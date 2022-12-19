import { useAuth } from '../../contexts/Auth'

import { ClassEvaluationResult } from '../../views/class'

const EvaluationDetail = () => {
  // Auth States
  const { authState } = useAuth()
  const { user } = authState

  return (
    <>
      {user && user.role === 'TEACHER'
        ? <ClassEvaluationResult />
        : <div>Student Evaluation Detail</div>
      }
    </>
  )
}

export default EvaluationDetail

import { useParams } from 'react-router-dom'

const EditEvaluation = () => {
  // useParams
  const { evaluationId } = useParams()
  return (
    <div className="flex flex-col w-full space-y-4">
      <p>{evaluationId}</p>
    </div>
  )
}

export default EditEvaluation

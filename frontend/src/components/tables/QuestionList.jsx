import { Empty } from '../../pages/error'
import { QuestionDetail } from '../card'

const QuestionList = (props) => {
  // Props Destructure
  const { evaluation, setFetchEvaluation } = props
  const { questions } = evaluation

  return (
    <div className="flex flex-col w-full px-3 space-y-4 text-black dark:text-white rounded-md duration-300 ease-in-out">
      <p className="my-0 text-lg text-center font-semibold">
        Daftar Pertanyaan
      </p>

      {questions.length === 0
        ? <Empty message="Belum ada pertanyaan pada evaluasi ini." />
        : questions.map((question, index) => {
          const questionDetailProps = {
            questionDetail: question,
            setFetchEvaluation
          }

          return (
            <QuestionDetail key={index} {...questionDetailProps} />
          )
        })
      }
    </div>
  )
}

export default QuestionList

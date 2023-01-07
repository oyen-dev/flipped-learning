const ExamQuestion = (props) => {
  // Props Destructure
  const { question: questionDetail, answers, setAnswers } = props
  const { question: q } = questionDetail
  const { question, options, _id } = q

  // Local States
  const answerIndex = answers.findIndex((answer) => answer.question._id === _id)

  // Handle answer
  const handleAnswer = (index) => {
    const newAnswers = [...answers]
    newAnswers[answerIndex].answer = index
    setAnswers(newAnswers)
  }

  return (
    <div className="flex flex-col w-full px-3 space-y-4 text-black dark:text-white rounded-md duration-300 ease-in-out">

      {/* Make a list of a answer using radio */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 text-2xl font-bold text-gray-800">{answerIndex + 1}. {question}</div>
        <div className="flex flex-col space-y-2 mb-4 text-gray-700">
          {options.map((option, index) => (
            <label
              key={index}
              className="hover:text-semibold group cursor-pointer"
            >
              <input
                type="radio"
                name={_id}
                value={option}
                checked={answers[answerIndex].answer === index}
                onChange={() => handleAnswer(index)}
                hidden
                className="mr-2"
              />
              <span
                className={`duration-75 ease-in-out ${
                  (answerIndex !== -1 ? answers[answerIndex].answer : null) === index
                    ? 'font-bold bg-green-400 py-1 px-2 rounded-lg'
                    : 'hover:font-semibold'
                }`}
              >
                <span className='font-bold'>{String.fromCharCode(97 + index).toUpperCase()}.</span> {option}
              </span>
              <br />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamQuestion

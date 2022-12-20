const ResultQuestion = (props) => {
  // Props Destructure
  const { question: questionDetail, answer, currentQuestion } = props
  const { _id, question, options, key } = questionDetail

  return (
    <div className="flex flex-col w-full px-3 space-y-4 text-black dark:text-white rounded-md duration-300 ease-in-out">
      {/* Make a list of a answer using radio */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 text-2xl font-bold text-gray-800">
          {currentQuestion + 1}. {question}
        </div>
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
                checked={answer === index}
                disabled
                hidden
                className="mr-2"
              />
              <span
                className={`duration-75 ease-in-out py-1 px-2 rounded-lg ${
                  answer === index && key === index
                    ? 'font-bold bg-green-400'
                    : answer === index && key !== index
                    ? 'font-bold bg-red-400'
                    : key === index && answer !== index
                    ? 'font-bold bg-green-400'
                    : 'font-normal'
                }`}
              >
                <span className="font-bold">
                  {String.fromCharCode(97 + index).toUpperCase()}.
                </span>{' '}
                {option}
              </span>
              <br />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResultQuestion

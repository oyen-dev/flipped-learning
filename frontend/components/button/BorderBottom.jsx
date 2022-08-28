const BorderBottom = (props) => {
  const { name } = props
  return (
    <button className="flex px-5 py-2 bg-gray-900 text-white rounded-t-lg border-b-4 border-gray-700 hover:border-blue-500 duration-150">
      <span className="flex text-sm font-medium tracking-wide whitespace-nowrap">
        {name}
      </span>
    </button>
  )
}

export default BorderBottom

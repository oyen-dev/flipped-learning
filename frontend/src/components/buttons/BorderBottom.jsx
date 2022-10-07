const BorderBottom = (props) => {
  const { name, active, tabId, setTabKey } = props
  return (
      <button
        className={`flex px-5 py-2 bg-[#accbe1] dark:bg-gray-900 text-black dark:text-white rounded-t-lg border-b-4 text-xs font-medium border-gray-700 hover:border-blue-500 duration-150 ${active ? 'border-blue-500' : ''} transition-all ease-in-out duration-300`}
        onClick={() => setTabKey(tabId)}
        >
        <span className="flex tracking-wide whitespace-nowrap">
          {name}
        </span>
      </button>
  )
}

export default BorderBottom

const BreadCrumb = (props) => {
  const { navigate, paths } = props

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {paths.map((path) => (
          <li key={path.destination}>
            <a
              className="text-gray-900 dark:text-white hover:text-blue-700 hover:dark:text-white"
              onClick={() => navigate(path.destination)}
            >
              {path.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BreadCrumb

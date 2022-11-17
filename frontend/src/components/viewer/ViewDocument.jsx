const ViewDocument = (props) => {
  // Destructure props
  const { url, name } = props

  return (
    <div className="flex flex-col space-y-2 w-full h-full">
      <p className="mb-0 text-base">{name}</p>
      <div className="flex w-full h-full items-center justify-center">
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
          frameBorder="0"
          className="flex w-full min-h-[750px] h-full"
        >
          This is an embedded{' '}
          <a target="_blank" href="http://office.com" rel="noreferrer">
            Microsoft Office
          </a>{' '}
          document, powered by{' '}
          <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
            Office Online
          </a>
          .
        </iframe>
      </div>
    </div>
  )
}

export default ViewDocument

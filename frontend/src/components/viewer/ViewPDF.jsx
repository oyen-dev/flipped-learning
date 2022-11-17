const ViewPDF = (props) => {
  // Destructure props
  const { file } = props
  return (
    <div className="flex w-full h-screen">
      <object
        data={file}
        type="application/pdf"
        className="flex w-full h-full"
      >
        <p>
          Alternative text - include a link{' '}
          <a href={file}>to the PDF!</a>
        </p>
      </object>
    </div>
  )
}

export default ViewPDF

import { useState } from 'react'

import { Document, Page } from 'react-pdf'

const ViewPDF = (props) => {
  // Destructure props
  const { file } = props

  // Local states
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  // Handle on document load success
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }
  return (
    <div className="flex w-full">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <p className='mb-0 text-sm'>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default ViewPDF

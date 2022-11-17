import AppRoutes from './routes'
import { AuthProvider } from './contexts/Auth'
import { GlobalProvider } from './contexts/Global'

import { Worker } from '@react-pdf-viewer/core'

const App = () => {
  return (
    <div className="flex flex-col w-full">
      <AuthProvider>
        <GlobalProvider>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <AppRoutes />
          </Worker>
        </GlobalProvider>
      </AuthProvider>
    </div>
  )
}

export default App

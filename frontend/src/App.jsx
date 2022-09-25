import AppRoutes from './routes'
import { AuthProvider } from './contexts/Auth'
import { GlobalProvider } from './contexts/Global'

const App = () => {
  return (
    <div className="flex flex-col w-full">
      <AuthProvider>
        <GlobalProvider>
          <AppRoutes />
        </GlobalProvider>
      </AuthProvider>
    </div>
  )
}

export default App

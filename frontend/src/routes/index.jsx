import { LoginPage, RegisterPage, ForgotPage } from '../pages/auth'

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom'

export default function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPage />} />
          <Route index element={<LoginPage />} />
        </Route>

        {/* Handle page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home () {
  const location = useLocation()
  const navigate = useNavigate()

  const handleMove = () => {
    navigate('/contact')
  }
  return (
    <div className="flex flex-col w-full ">
      <p className="text-center text-xl text-red-500">
        Ini adalah tampilan Home
      </p>
      <p className="font-bold text-center">{location.pathname}</p>

      <button className="btn btn-primary" onClick={handleMove}>
        Contact
      </button>
    </div>
  )
}

function Contact () {
  const location = useLocation()
  const navigate = useNavigate()

  const handleMove = () => {
    navigate('/')
  }
  return (
    <div className="flex flex-col w-full ">
      <p className="text-center text-xl text-red-500">
        Ini adalah tampilan Contact
      </p>
      <p className="font-bold text-center">{location.pathname}</p>

      <button className="btn btn-primary" onClick={handleMove}>
        Dashboard
      </button>

      <p>{location.pathname.includes('/') ? 'Yass' : 'Nope'}</p>
    </div>
  )
}

function Dashboard () {
  const location = useLocation()
  const navigate = useNavigate()

  const handleMove = () => {
    navigate('/home')
  }

  const handleMoveL = () => {
    navigate('/auth')
  }
  return (
    <div className="flex flex-col w-full ">
      <p className="text-center text-xl text-red-500">
        Ini adalah tampilan Dashboard
      </p>
      <p className="font-bold text-center">{location.pathname}</p>

      <button className="btn btn-primary" onClick={handleMove}>
        Home
      </button>

      <button className="mt-5 btn btn-primary" onClick={handleMoveL}>
        Login
      </button>
    </div>
  )
}

function NotFound () {
  return <h2>Not Found</h2>
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {/* Handle page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home () {
  return <h2>Home</h2>
}

function Contact () {
  return <h2>Contact</h2>
}

function Dashboard () {
  return <h2>Dashboard</h2>
}

function NotFound () {
  return <h2>Not Found</h2>
}

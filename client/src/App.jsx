import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Analyze from './pages/Analyze'
import Results from './pages/Results'


const Protected = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text3)' }}>Loading...</div>
  return user ? children : <Navigate to="/login" />
}
const Public = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text3)' }}>Loading...</div>
  return user ? <Navigate to="/dashboard" /> : children
}

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      {/* Public routes */}
      <Route path="/"          element={<Landing />} />
      <Route path="/analyze"   element={<Analyze />} />
      <Route path="/login"     element={<Public><Login /></Public>} />
      <Route path="/register"  element={<Public><Register /></Public>} />
      {/* Protected routes */}
      <Route path="/dashboard"   element={<Protected><Dashboard /></Protected>} />
      <Route path="/results/:id" element={<Results />} />
    </Routes>
  </>
)

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter><AppRoutes /></BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
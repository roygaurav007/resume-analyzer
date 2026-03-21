import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
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
      <Route path="/"            element={<Navigate to="/dashboard" />} />
      <Route path="/login"       element={<Public><Login /></Public>} />
      <Route path="/register"    element={<Public><Register /></Public>} />
      <Route path="/dashboard"   element={<Protected><Dashboard /></Protected>} />
      <Route path="/analyze"     element={<Protected><Analyze /></Protected>} />
      <Route path="/results/:id" element={<Protected><Results /></Protected>} />
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
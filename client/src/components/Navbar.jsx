import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', backdropFilter:'blur(20px)', position:'sticky', top:0, zIndex:100, transition:'background 0.3s' }}>
      <style>{`
        .logout-b { background:none; border:none; font-size:13px; cursor:pointer; font-weight:500; font-family:inherit; color:var(--text3); transition:color 0.2s; padding:0; }
        .logout-b:hover { color:var(--text2); }
        .tog { width:40px; height:23px; border-radius:99px; border:1px solid var(--border); cursor:pointer; position:relative; background:var(--bg2); flex-shrink:0; transition:all 0.3s; }
        .knob { width:17px; height:17px; border-radius:50%; position:absolute; top:2px; transition:transform 0.3s; display:flex; align-items:center; justify-content:center; font-size:11px; }
        .nav-link { font-size:14px; font-weight:500; color:var(--text3); text-decoration:none; padding:6px 10px; border-radius:8px; transition:all 0.2s; }
        .nav-link:hover { color:var(--text); background:var(--bg2); }
        .nav-link-active { color:var(--text) !important; background:var(--bg2) !important; }
        .nav-try { padding:8px 18px; border-radius:9px; font-size:14px; font-weight:700; color:white; background:linear-gradient(135deg,#2563eb,#7c3aed); text-decoration:none; transition:all 0.25s; box-shadow:0 0 16px rgba(37,99,235,0.3); }
        .nav-try:hover { transform:translateY(-1px); box-shadow:0 4px 20px rgba(37,99,235,0.5); }
        .nav-signup { padding:8px 18px; border-radius:9px; font-size:14px; font-weight:700; color:white; background:linear-gradient(135deg,#2563eb,#7c3aed); text-decoration:none; transition:all 0.25s; }
        .nav-signup:hover { transform:translateY(-1px); box-shadow:0 4px 20px rgba(37,99,235,0.5); }
      `}</style>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 22px', height:'56px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:'32px', height:'32px', background:'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius:'9px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'white', fontWeight:'900', fontSize:'15px' }}>R</span>
          </div>
          <div style={{ display:'flex', alignItems:'baseline' }}>
            {'ResumeAI'.split('').map((ch,i) => (
              <span key={i} style={{ fontSize:'17px', fontWeight:'900', color: i>=6 ? '#60a5fa' : 'var(--text)' }}>{ch}</span>
            ))}
          </div>
        </Link>

        {/* Nav links — center */}
        <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
          <Link to="/analyze" className={`nav-link${pathname==='/analyze'?' nav-link-active':''}`}>Analyze</Link>
          <Link to="/templates" className={`nav-link${pathname==='/templates'?' nav-link-active':''}`}>Templates</Link>
          {user && <Link to="/dashboard" className={`nav-link${pathname==='/dashboard'?' nav-link-active':''}`}>Dashboard</Link>}
        </div>

        {/* Right side */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          {/* Theme toggle */}
          <button className="tog" onClick={toggle} title={dark?'Light mode':'Dark mode'}>
            <div className="knob" style={{ background:dark?'#a78bfa':'#fbbf24', transform:dark?'translateX(2px)':'translateX(20px)' }}>
              {dark ? '🌙' : '☀️'}
            </div>
          </button>

          {user ? (
            <>
              <span style={{ color:'var(--text3)', fontSize:'13px', whiteSpace:'nowrap' }}>
                Hi, <span style={{ color:'var(--text2)', fontWeight:'600' }}>{user.name?.split(' ')[0]}</span>
                {user.isGuest && <span style={{ color:'#fbbf24', fontSize:'11px', marginLeft:'5px', fontWeight:'700', background:'rgba(251,191,36,0.1)', padding:'1px 7px', borderRadius:'99px', border:'1px solid rgba(251,191,36,0.25)' }}>Guest</span>}
              </span>
              <button className="logout-b" onClick={() => { logout(); navigate('/') }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" style={{ display: pathname==='/' ? 'block' : 'block' }}>Login</Link>
              <Link to="/analyze" className="nav-try">Try Free →</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
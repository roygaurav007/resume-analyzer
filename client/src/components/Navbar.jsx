import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLogin = pathname === '/login'
  const isReg   = pathname === '/register'

  return (
    <nav style={{ background:'var(--nav-bg)', borderBottom:'1px solid var(--border)', backdropFilter:'blur(20px)', position:'sticky', top:0, zIndex:100, transition:'background 0.3s' }}>
      <style>{`
        .nav-ul::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px; background:linear-gradient(135deg,#2563eb,#7c3aed); border-radius:99px; }
        .logout-b { background:none; border:none; font-size:13px; cursor:pointer; font-weight:500; font-family:inherit; color:var(--text3); transition:color 0.2s; padding:0; }
        .logout-b:hover { color:var(--text2); }
        .tog { width:40px; height:23px; border-radius:99px; border:1px solid var(--border); cursor:pointer; position:relative; background:var(--bg2); flex-shrink:0; transition:all 0.3s; }
        .knob { width:17px; height:17px; border-radius:50%; position:absolute; top:2px; transition:transform 0.3s; display:flex; align-items:center; justify-content:center; font-size:11px; }
        .nav-signup { padding:7px 16px; border-radius:9px; font-size:14px; font-weight:700; color:white; transition:all 0.25s; }
        .nav-login  { padding:7px 16px; border-radius:9px; font-size:14px; font-weight:600; transition:all 0.25s; }
      `}</style>
      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 22px', height:'56px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        {/* Logo */}
        <Link to={user ? '/dashboard' : '/login'} style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none', flexShrink:0 }}>
          <div style={{ width:'32px', height:'32px', background:'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius:'9px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:'white', fontWeight:'900', fontSize:'15px' }}>R</span>
          </div>
          <div style={{ display:'flex', alignItems:'baseline' }}>
            {'ResumeAI'.split('').map((ch,i) => (
              <span key={i} style={{ fontSize:'17px', fontWeight:'900', color: i>=6 ? '#60a5fa' : 'var(--text)' }}>{ch}</span>
            ))}
          </div>
        </Link>

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
              <button className="logout-b" onClick={() => { logout(); navigate('/login') }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration:'none', position:'relative' }} className={isLogin?'nav-ul':''}>
                <div className="nav-login" style={{ color:isLogin?'var(--text)':'var(--text3)', background:isLogin?'var(--bg2)':'transparent', border:isLogin?'1px solid var(--border2)':'1px solid transparent' }}>
                  Login
                </div>
              </Link>
              <Link to="/register" style={{ textDecoration:'none' }}>
                <div className="nav-signup" style={{
                  background: isReg ? 'linear-gradient(135deg,#16a34a,#2563eb)' : 'linear-gradient(135deg,#2563eb,#7c3aed)',
                  boxShadow:  isReg ? '0 0 16px rgba(22,163,74,0.4)' : '0 0 16px rgba(37,99,235,0.3)',
                  transform:  isReg ? 'scale(1.04)' : 'scale(1)',
                }}>
                  {isReg ? '✓ Sign Up' : 'Sign Up'}
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
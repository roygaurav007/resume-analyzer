import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import api from '../api/axios'

export default function Login() {
  const [form, setForm]       = useState({ email:'', password:'' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoad]  = useState(false)
  const { login } = useAuth()
  const { dark }  = useTheme()
  const navigate  = useNavigate()

  const onChange = e => { setForm({...form,[e.target.name]:e.target.value}); setError('') }
  const onSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('')
    try { const r = await api.post('/auth/login',form); login(r.data.user,r.data.token); navigate('/dashboard') }
    catch(err) { setError(err.response?.data?.message||'Login failed') }
    finally { setLoading(false) }
  }
  const onGuest = async () => {
    setGLoad(true)
    try { const r = await api.post('/auth/guest'); login(r.data.user,r.data.token); navigate('/dashboard') }
    catch { setError('Guest login failed.') }
    finally { setGLoad(false) }
  }

  // Colors adapt per theme — animations always render
  const c = {
    b1: dark?'rgba(37,99,235,0.22)':'rgba(37,99,235,0.1)',
    b2: dark?'rgba(124,58,237,0.18)':'rgba(124,58,237,0.08)',
    b3: dark?'rgba(52,211,153,0.1)':'rgba(52,211,153,0.07)',
    sc: dark?'rgba(59,130,246,0.25)':'rgba(59,130,246,0.12)',
    o1: dark?'#60a5fa':'#3b82f6',
    o2: dark?'#a78bfa':'#8b5cf6',
    st: dark?'white':'#3b82f6',
    gr: dark?'rgba(255,255,255,0.02)':'rgba(37,99,235,0.05)',
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',fontFamily:"'Segoe UI',sans-serif",background:'var(--bg)',transition:'background 0.3s',overflow:'hidden'}}>
      <style>{`
        @keyframes b1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(50px,-35px) scale(1.08)}75%{transform:translate(-20px,25px) scale(0.94)}}
        @keyframes b2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-35px,20px) scale(1.06)}70%{transform:translate(25px,-15px) scale(0.95)}}
        @keyframes b3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,28px) scale(1.1)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(37,99,235,0.45)}50%{box-shadow:0 0 50px rgba(37,99,235,0.8),0 0 80px rgba(124,58,237,0.3)}}
        @keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sl{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes sr{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes orb1{to{transform:rotate(360deg) translateX(220px) rotate(-360deg)}}
        @keyframes orb2{to{transform:rotate(-360deg) translateX(160px) rotate(360deg)}}
        @keyframes tw{0%,100%{opacity:0.15;transform:scale(0.7)}50%{opacity:0.9;transform:scale(1.5)}}
        @keyframes scan{0%{top:-2px;opacity:0.7}100%{top:100%;opacity:0}}
        @keyframes lp{0%{opacity:0;transform:translateY(18px) scale(0.8)}60%{transform:translateY(-3px) scale(1.04)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes gp{0%,100%{border-color:rgba(251,191,36,0.35)}50%{border-color:rgba(251,191,36,0.7);box-shadow:0 0 0 4px rgba(251,191,36,0)}}
        .inp{width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--inp-border);font-size:14px;outline:none;background:var(--inp-bg);color:var(--text);box-sizing:border-box;transition:all 0.25s;font-family:inherit}
        .inp::placeholder{color:var(--text4)}
        .inp:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,0.12)}
        .inp:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px var(--inp-bg) inset !important;-webkit-text-fill-color:var(--text) !important}
        .bmain{width:100%;padding:13px;border:none;border-radius:11px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;transition:all 0.3s;animation:glow 3s ease-in-out infinite}
        .bmain:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(37,99,235,0.6)}
        .bmain:disabled{opacity:0.5;cursor:not-allowed;transform:none;animation:none}
        .bguest{width:100%;padding:13px 16px;border-radius:11px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;background:rgba(251,191,36,0.07);border:1.5px solid rgba(251,191,36,0.35);transition:all 0.3s;animation:gp 2.5s ease-in-out infinite;display:flex;align-items:center;justify-content:center;gap:10px}
        .bguest:hover{background:rgba(251,191,36,0.14);border-color:rgba(251,191,36,0.8);transform:translateY(-2px);box-shadow:0 8px 24px rgba(251,191,36,0.2);animation:none}
        .bguest:disabled{opacity:0.5;cursor:not-allowed;transform:none;animation:none}
        .frow{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}
        .frow:last-child{border-bottom:none}
      `}</style>

      {/* LEFT */}
      <div style={{flex:1,position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 64px'}}>
        {/* Blobs - always rendered, lighter in light mode */}
        <div style={{position:'absolute',top:'-10%',left:'-5%',width:'520px',height:'520px',background:`radial-gradient(circle,${c.b1} 0%,transparent 65%)`,animation:'b1 14s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'-10%',right:'-5%',width:'420px',height:'420px',background:`radial-gradient(circle,${c.b2} 0%,transparent 65%)`,animation:'b2 18s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'45%',left:'45%',width:'340px',height:'340px',background:`radial-gradient(circle,${c.b3} 0%,transparent 65%)`,animation:'b3 11s ease-in-out infinite',pointerEvents:'none',transform:'translate(-50%,-50%)'}}/>
        {/* Grid */}
        <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${c.gr} 1px,transparent 1px),linear-gradient(90deg,${c.gr} 1px,transparent 1px)`,backgroundSize:'50px 50px',pointerEvents:'none'}}/>
        {/* Orbiting dots */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none'}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:c.o1,boxShadow:`0 0 10px ${c.o1}`,animation:'orb1 10s linear infinite'}}/>
          <div style={{width:'3px',height:'3px',borderRadius:'50%',background:c.o2,boxShadow:`0 0 7px ${c.o2}`,animation:'orb2 14s linear infinite',marginTop:'-3px'}}/>
        </div>
        {/* Stars */}
        {[{t:'8%',l:'7%',d:'0s'},{t:'18%',l:'86%',d:'1s'},{t:'60%',l:'5%',d:'1.6s'},{t:'84%',l:'78%',d:'0.4s'},{t:'40%',l:'92%',d:'2s'},{t:'75%',l:'40%',d:'1.2s'}].map((s,i)=>(
          <div key={i} style={{position:'absolute',top:s.t,left:s.l,width:'3px',height:'3px',borderRadius:'50%',background:c.st,animation:`tw ${2+i*0.35}s ease-in-out infinite ${s.d}`,pointerEvents:'none'}}/>
        ))}
        {/* Scan line */}
        <div style={{position:'absolute',left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${c.sc},transparent)`,animation:'scan 7s linear infinite',pointerEvents:'none'}}/>

        <div style={{position:'relative',zIndex:1,maxWidth:'500px',animation:'sl 0.7s ease both'}}>
          {/* Logo */}
          <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'40px'}}>
            <div style={{width:'52px',height:'52px',background:'linear-gradient(135deg,#2563eb,#7c3aed)',borderRadius:'15px',display:'flex',alignItems:'center',justifyContent:'center',animation:'glow 3s ease-in-out infinite',flexShrink:0}}>
              <span style={{color:'white',fontSize:'24px',fontWeight:'900'}}>R</span>
            </div>
            <div style={{display:'flex',alignItems:'baseline'}}>
              {'ResumeAI'.split('').map((ch,i)=>(
                <span key={i} style={{fontSize:'28px',fontWeight:'900',color:i>=6?'#60a5fa':'var(--text)',animation:`lp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.1+i*0.07}s both`,display:'inline-block'}}>{ch}</span>
              ))}
            </div>
          </div>
          <h1 style={{color:'var(--text)',fontSize:'46px',fontWeight:'900',lineHeight:1.06,marginBottom:'16px',letterSpacing:'-1.2px'}}>
            Land more interviews<br/>with{' '}
            <span style={{background:'linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'grad 4s ease infinite'}}>AI feedback</span>
          </h1>
          <p style={{color:'var(--text3)',fontSize:'17px',lineHeight:1.8,marginBottom:'40px',maxWidth:'420px'}}>
            Upload your resume. Get ATS score, specific fixes, and rewritten bullet points in under 20 seconds.
          </p>
          <div>
            {[{icon:'🎯',text:'ATS score with 4-point breakdown'},{icon:'✍️',text:'Before/after bullet rewrites with real metrics'},{icon:'💡',text:'Quick wins you can apply in 5 minutes'}].map((f,i)=>(
              <div key={i} className="frow" style={{animation:`fu 0.5s ease ${0.5+i*0.1}s both`}}>
                <span style={{fontSize:'20px',flexShrink:0}}>{f.icon}</span>
                <span style={{color:'var(--text2)',fontSize:'16px'}}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{width:'440px',flexShrink:0,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 44px',background:'var(--card-bg)',borderLeft:'1px solid var(--border)',backdropFilter:'blur(20px)',animation:'sr 0.7s ease both',transition:'background 0.3s'}}>
        <div>
          <div style={{animation:'fu 0.5s ease 0.1s both',marginBottom:'28px'}}>
            <h2 style={{fontSize:'26px',fontWeight:'900',color:'var(--text)',marginBottom:'5px'}}>Welcome back</h2>
            <p style={{color:'var(--text3)',fontSize:'14px',margin:0}}>Sign in to continue your journey</p>
          </div>
          {error&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',color:dark?'#f87171':'#dc2626',borderRadius:'10px',padding:'11px 14px',fontSize:'13px',marginBottom:'18px'}}>{error}</div>}
          <form onSubmit={onSubmit}>
            <div style={{marginBottom:'14px',animation:'fu 0.5s ease 0.2s both'}}>
              <label style={{display:'block',fontSize:'11px',fontWeight:'700',color:'var(--text4)',marginBottom:'7px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@example.com" className="inp"/>
            </div>
            <div style={{marginBottom:'22px',animation:'fu 0.5s ease 0.28s both'}}>
              <label style={{display:'block',fontSize:'11px',fontWeight:'700',color:'var(--text4)',marginBottom:'7px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Password</label>
              <input type="password" name="password" value={form.password} onChange={onChange} required placeholder="••••••••" className="inp"/>
            </div>
            <div style={{animation:'fu 0.5s ease 0.35s both',marginBottom:'12px'}}>
              <button type="submit" disabled={loading} className="bmain">{loading?'Signing in...':'Sign in →'}</button>
            </div>
          </form>
          <div style={{display:'flex',alignItems:'center',gap:'12px',margin:'6px 0 12px',animation:'fu 0.5s ease 0.42s both'}}>
            <div style={{flex:1,height:'1px',background:'var(--border)'}}/>
            <span style={{color:'var(--text4)',fontSize:'11px',fontWeight:'600',letterSpacing:'0.07em'}}>OR TRY FOR FREE</span>
            <div style={{flex:1,height:'1px',background:'var(--border)'}}/>
          </div>
          <div style={{animation:'fu 0.5s ease 0.48s both',marginBottom:'28px'}}>
            <button onClick={onGuest} disabled={gLoading} className="bguest">
              <span style={{fontSize:'18px'}}>👤</span>
              <div style={{textAlign:'left'}}>
                <p style={{margin:0,fontSize:'14px',fontWeight:'700',color:dark?'#fbbf24':'#d97706'}}>{gLoading?'Setting up...':'Continue as Guest'}</p>
                <p style={{margin:0,fontSize:'12px',color:'var(--text3)'}}>No signup · 5 free scans per hour</p>
              </div>
              {!gLoading&&<span style={{marginLeft:'auto',color:'var(--text4)',fontSize:'16px'}}>→</span>}
            </button>
          </div>
          <p style={{textAlign:'center',fontSize:'14px',color:'var(--text4)',margin:0,animation:'fu 0.5s ease 0.54s both'}}>
            No account?{' '}<Link to="/register" style={{color:'#3b82f6',fontWeight:'700',textDecoration:'none'}}>Create one free — 25 scans/day</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
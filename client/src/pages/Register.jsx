import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import api from '../api/axios'

export default function Register() {
  const [form, setForm]       = useState({ name:'', email:'', password:'' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { dark }  = useTheme()
  const navigate  = useNavigate()

  const onChange = e => { setForm({...form,[e.target.name]:e.target.value}); setError('') }
  const onSubmit = async e => {
    e.preventDefault()
    if (form.password.length < 6) return setError('Password must be at least 6 characters')
    setLoading(true); setError('')
    try { const r = await api.post('/auth/register',form); login(r.data.user,r.data.token); navigate('/dashboard') }
    catch(err) { setError(err.response?.data?.message||'Registration failed') }
    finally { setLoading(false) }
  }

  const c = {
    b1: dark?'rgba(34,197,94,0.2)':'rgba(34,197,94,0.1)',
    b2: dark?'rgba(37,99,235,0.16)':'rgba(37,99,235,0.08)',
    sc: dark?'rgba(34,197,94,0.25)':'rgba(34,197,94,0.12)',
    o1: dark?'#4ade80':'#22c55e',
    o2: dark?'#60a5fa':'#3b82f6',
    st: dark?'white':'#22c55e',
    gr: dark?'rgba(255,255,255,0.02)':'rgba(34,197,94,0.05)',
    ai: dark?'#4ade80':'#16a34a',
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',fontFamily:"'Segoe UI',sans-serif",background:'var(--bg)',transition:'background 0.3s',overflow:'hidden'}}>
      <style>{`
        @keyframes b1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(45px,-35px) scale(1.08)}75%{transform:translate(-20px,28px) scale(0.93)}}
        @keyframes b2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-35px,22px) scale(1.07)}70%{transform:translate(28px,-18px) scale(0.95)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(34,197,94,0.4)}50%{box-shadow:0 0 50px rgba(34,197,94,0.7),0 0 80px rgba(37,99,235,0.3)}}
        @keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sl{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes sr{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes orb1{to{transform:rotate(360deg) translateX(220px) rotate(-360deg)}}
        @keyframes orb2{to{transform:rotate(-360deg) translateX(160px) rotate(360deg)}}
        @keyframes tw{0%,100%{opacity:0.15;transform:scale(0.7)}50%{opacity:0.9;transform:scale(1.5)}}
        @keyframes scan{0%{top:-2px;opacity:0.7}100%{top:100%;opacity:0}}
        @keyframes lp{0%{opacity:0;transform:translateY(18px) scale(0.8)}60%{transform:translateY(-3px) scale(1.04)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes gg{0%,100%{border-color:rgba(34,197,94,0.3)}50%{border-color:rgba(34,197,94,0.6);box-shadow:0 0 0 4px rgba(34,197,94,0)}}
        .inp{width:100%;padding:12px 14px;border-radius:10px;border:1.5px solid var(--inp-border);font-size:14px;outline:none;background:var(--inp-bg);color:var(--text);box-sizing:border-box;transition:all 0.25s;font-family:inherit}
        .inp::placeholder{color:var(--text4)}
        .inp:focus{border-color:#22c55e;box-shadow:0 0 0 3px rgba(34,197,94,0.1)}
        .inp:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px var(--inp-bg) inset !important;-webkit-text-fill-color:var(--text) !important}
        .bmain{width:100%;padding:13px;border:none;border-radius:11px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;background:linear-gradient(135deg,#16a34a,#2563eb);color:white;transition:all 0.3s;animation:glow 3s ease-in-out infinite}
        .bmain:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(34,197,94,0.5)}
        .bmain:disabled{opacity:0.5;cursor:not-allowed;transform:none;animation:none}
        .brow{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)}
        .brow:last-child{border-bottom:none}
        @media(max-width:768px){
          .reg-left{display:none !important}
          .reg-right{width:100% !important;padding:32px 24px !important;border-left:none !important;min-height:100vh;overflow-y:auto}
        }
      `}</style>

      {/* LEFT */}
      <div className="reg-left" style={{flex:1,position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center',padding:'60px 64px'}}>
        <div style={{position:'absolute',top:'-10%',left:'-5%',width:'520px',height:'520px',background:`radial-gradient(circle,${c.b1} 0%,transparent 65%)`,animation:'b1 14s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',bottom:'-10%',right:'-5%',width:'420px',height:'420px',background:`radial-gradient(circle,${c.b2} 0%,transparent 65%)`,animation:'b2 18s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${c.gr} 1px,transparent 1px),linear-gradient(90deg,${c.gr} 1px,transparent 1px)`,backgroundSize:'50px 50px',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none'}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:c.o1,boxShadow:`0 0 10px ${c.o1}`,animation:'orb1 10s linear infinite'}}/>
          <div style={{width:'3px',height:'3px',borderRadius:'50%',background:c.o2,boxShadow:`0 0 7px ${c.o2}`,animation:'orb2 14s linear infinite',marginTop:'-3px'}}/>
        </div>
        {[{t:'8%',l:'7%'},{t:'18%',l:'86%'},{t:'60%',l:'5%'},{t:'84%',l:'78%'},{t:'40%',l:'92%'},{t:'75%',l:'40%'}].map((s,i)=>(
          <div key={i} style={{position:'absolute',top:s.t,left:s.l,width:'3px',height:'3px',borderRadius:'50%',background:c.st,animation:`tw ${2+i*0.35}s ease-in-out infinite ${i*0.4}s`,pointerEvents:'none'}}/>
        ))}
        <div style={{position:'absolute',left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${c.sc},transparent)`,animation:'scan 7s linear infinite',pointerEvents:'none'}}/>
        <div style={{position:'relative',zIndex:1,maxWidth:'500px',animation:'sl 0.7s ease both'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'40px'}}>
            <div style={{width:'52px',height:'52px',background:'linear-gradient(135deg,#16a34a,#2563eb)',borderRadius:'15px',display:'flex',alignItems:'center',justifyContent:'center',animation:'glow 3s ease-in-out infinite',flexShrink:0}}>
              <span style={{color:'white',fontSize:'24px',fontWeight:'900'}}>R</span>
            </div>
            <div style={{display:'flex',alignItems:'baseline'}}>
              {'ResumeAI'.split('').map((ch,i)=>(
                <span key={i} style={{fontSize:'28px',fontWeight:'900',color:i>=6?c.ai:'var(--text)',animation:`lp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.1+i*0.07}s both`,display:'inline-block'}}>{ch}</span>
              ))}
            </div>
          </div>
          <h1 style={{color:'var(--text)',fontSize:'46px',fontWeight:'900',lineHeight:1.06,marginBottom:'16px',letterSpacing:'-1.2px'}}>
            Free account.<br/>
            <span style={{background:'linear-gradient(135deg,#4ade80,#60a5fa,#a78bfa)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',animation:'grad 4s ease infinite'}}>25 scans a day.</span>
          </h1>
          <p style={{color:'var(--text3)',fontSize:'17px',lineHeight:1.8,marginBottom:'40px',maxWidth:'420px'}}>
            Create a free account and get 25 resume scans every day — 5× more than guest, with full history and progress tracking.
          </p>
          <div>
            {[{icon:'📊',text:'25 scans/day — resets at midnight'},{icon:'📂',text:'Full scan history saved forever'},{icon:'📈',text:'Track your ATS score improving over time'}].map((f,i)=>(
              <div key={i} className="brow" style={{animation:`fu 0.5s ease ${0.5+i*0.1}s both`}}>
                <span style={{fontSize:'20px',flexShrink:0}}>{f.icon}</span>
                <span style={{color:'var(--text2)',fontSize:'16px'}}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="reg-right" style={{width:'440px',flexShrink:0,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 44px',background:'var(--card-bg)',borderLeft:'1px solid var(--border)',backdropFilter:'blur(20px)',animation:'sr 0.7s ease both',transition:'background 0.3s'}}>
        <div>
          <div style={{animation:'fu 0.5s ease 0.1s both',marginBottom:'22px'}}>
            <h2 style={{fontSize:'26px',fontWeight:'900',color:'var(--text)',marginBottom:'8px'}}>Create your account</h2>
            <div style={{display:'inline-flex',alignItems:'center',gap:'7px',background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:'99px',padding:'4px 13px',animation:'gg 2.5s ease-in-out infinite'}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 5px #22c55e',flexShrink:0}}/>
              <span style={{color:c.ai,fontSize:'12px',fontWeight:'700'}}>Free forever · 25 scans/day · No credit card</span>
            </div>
          </div>
          {error&&<div style={{background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.25)',color:dark?'#f87171':'#dc2626',borderRadius:'10px',padding:'11px 14px',fontSize:'13px',marginBottom:'16px'}}>{error}</div>}
          <form onSubmit={onSubmit}>
            {[{label:'Full name',name:'name',type:'text',ph:'Rahul Sharma'},{label:'Email',name:'email',type:'email',ph:'you@example.com'},{label:'Password',name:'password',type:'password',ph:'Min 6 characters'}].map((f,i)=>(
              <div key={f.name} style={{marginBottom:i<2?'14px':'22px',animation:`fu 0.5s ease ${0.2+i*0.08}s both`}}>
                <label style={{display:'block',fontSize:'11px',fontWeight:'700',color:'var(--text4)',marginBottom:'7px',textTransform:'uppercase',letterSpacing:'0.08em'}}>{f.label}</label>
                <input type={f.type} name={f.name} value={form[f.name]} onChange={onChange} required placeholder={f.ph} className="inp"/>
              </div>
            ))}
            <div style={{animation:'fu 0.5s ease 0.44s both',marginBottom:'24px'}}>
              <button type="submit" disabled={loading} className="bmain">{loading?'Creating account...':'Create free account →'}</button>
            </div>
          </form>
          <p style={{textAlign:'center',fontSize:'14px',color:'var(--text4)',margin:0,animation:'fu 0.5s ease 0.5s both'}}>
            Already have an account?{' '}<Link to="/login" style={{color:'#3b82f6',fontWeight:'700',textDecoration:'none'}}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
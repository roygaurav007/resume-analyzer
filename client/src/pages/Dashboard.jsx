import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const gc  = s => s>=80?'#22c55e':s>=60?'#3b82f6':s>=40?'#f59e0b':'#ef4444'
const gcb = s => s>=80?'rgba(34,197,94,0.12)':s>=60?'rgba(59,130,246,0.12)':s>=40?'rgba(245,158,11,0.12)':'rgba(239,68,68,0.12)'

function Chart({ resumes }) {
  const ref  = useRef(null)
  const data = [...resumes].reverse().slice(-10)
  useEffect(()=>{
    const c = ref.current; if(!c||data.length<2) return
    const dpr=window.devicePixelRatio||1
    c.width=c.offsetWidth*dpr; c.height=c.offsetHeight*dpr
    const ctx=c.getContext('2d'); ctx.scale(dpr,dpr)
    const w=c.offsetWidth,h=c.offsetHeight
    const isDark=document.documentElement.getAttribute('data-theme')!=='light'
    ctx.clearRect(0,0,w,h)
    const pad={t:20,r:20,b:36,l:38},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b
    const scores=data.map(r=>r.atsScore)
    const mn=Math.max(0,Math.min(...scores)-10),mx=Math.min(100,Math.max(...scores)+10),rng=mx-mn||20
    const px=i=>pad.l+(i/(data.length-1))*cw, py=s=>pad.t+ch-((s-mn)/rng)*ch
    const gc2=isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.07)'
    const lc=isDark?'rgba(255,255,255,0.3)':'rgba(0,0,0,0.4)'
    for(let i=0;i<=4;i++){
      const y=pad.t+(i/4)*ch
      ctx.beginPath();ctx.strokeStyle=gc2;ctx.lineWidth=1;ctx.moveTo(pad.l,y);ctx.lineTo(pad.l+cw,y);ctx.stroke()
      ctx.fillStyle=lc;ctx.font='10px Segoe UI';ctx.textAlign='right';ctx.fillText(Math.round(mx-(i/4)*rng),pad.l-6,y+4)
    }
    const g=ctx.createLinearGradient(0,pad.t,0,pad.t+ch)
    g.addColorStop(0,'rgba(59,130,246,0.22)');g.addColorStop(1,'rgba(59,130,246,0)')
    ctx.beginPath();ctx.moveTo(px(0),py(scores[0]))
    for(let i=1;i<scores.length;i++){const cpx=(px(i-1)+px(i))/2;ctx.bezierCurveTo(cpx,py(scores[i-1]),cpx,py(scores[i]),px(i),py(scores[i]))}
    ctx.lineTo(px(scores.length-1),pad.t+ch);ctx.lineTo(px(0),pad.t+ch);ctx.closePath();ctx.fillStyle=g;ctx.fill()
    ctx.beginPath();ctx.strokeStyle='#3b82f6';ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.moveTo(px(0),py(scores[0]))
    for(let i=1;i<scores.length;i++){const cpx=(px(i-1)+px(i))/2;ctx.bezierCurveTo(cpx,py(scores[i-1]),cpx,py(scores[i]),px(i),py(scores[i]))}
    ctx.stroke()
    scores.forEach((s,i)=>{
      const x=px(i),y=py(s),col=gc(s)
      ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle=isDark?'#080d1a':'#f0f4ff';ctx.fill()
      ctx.strokeStyle=col;ctx.lineWidth=2;ctx.stroke()
      ctx.fillStyle=col;ctx.font='bold 11px Segoe UI';ctx.textAlign='center';ctx.fillText(s,x,y-12)
      ctx.fillStyle=lc;ctx.font='10px Segoe UI'
      ctx.fillText(new Date(data[i].createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}),x,pad.t+ch+20)
    })
  },[data])
  if(data.length<2) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text4)',fontSize:'14px'}}>Scan at least 2 resumes to see your progress</div>
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}}/>
}

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [resumes,setResumes] = useState([])
  const [loading,setLoading] = useState(true)
  const [usage,setUsage]     = useState(null)

  useEffect(()=>{
    api.get('/resume/history').then(r=>{setResumes(r.data.resumes);if(r.data.usage)setUsage(r.data.usage)}).catch(console.error).finally(()=>setLoading(false))
  },[])

  const del = async(id,e)=>{
    e.stopPropagation(); if(!confirm('Delete this scan?')) return
    try{await api.delete(`/resume/${id}`);setResumes(r=>r.filter(x=>x._id!==id))}catch{alert('Failed')}
  }

  const lat  = resumes.length?resumes[0].atsScore:0
  const best = resumes.length?Math.max(...resumes.map(r=>r.atsScore)):0
  const tr   = resumes.length>=2?resumes[0].atsScore-resumes[1].atsScore:0

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',padding:'36px 24px',transition:'background 0.3s'}}>
      <style>{`
        @keyframes su{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{box-shadow:0 0 18px rgba(37,99,235,0.35)}50%{box-shadow:0 0 40px rgba(37,99,235,0.65)}}
        .scard{background:var(--card-bg);border:1px solid var(--border);border-radius:18px;padding:20px 22px;transition:all 0.3s;cursor:default}
        .scard:hover{border-color:var(--border2);transform:translateY(-3px)}
        .rrow{background:var(--card-bg);border:1px solid var(--border);border-radius:14px;padding:16px 18px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all 0.25s;gap:16px;margin-bottom:10px}
        .rrow:hover{border-color:rgba(59,130,246,0.35);transform:translateX(4px);background:rgba(59,130,246,0.05)}
        .abtn{background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;padding:11px 22px;border-radius:11px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:14px;transition:all 0.3s;animation:glow 3s ease-in-out infinite;white-space:nowrap}
        .abtn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(37,99,235,0.5);animation:none}
        .db{background:none;border:none;cursor:pointer;color:var(--text4);padding:6px;border-radius:8px;display:flex;transition:all 0.2s;flex-shrink:0}
        .db:hover{color:#ef4444;background:rgba(239,68,68,0.1)}
      `}</style>
      <div style={{maxWidth:'960px',margin:'0 auto'}}>
        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'14px',animation:'su 0.45s ease both'}}>
          <div>
            <h1 style={{fontSize:'30px',fontWeight:'900',color:'var(--text)',marginBottom:'4px',letterSpacing:'-0.5px'}}>Hey {user?.name?.split(' ')[0]} 👋</h1>
            <p style={{color:'var(--text3)',fontSize:'14px',margin:0}}>{resumes.length>0?`${resumes.length} scan${resumes.length>1?'s':''} — keep improving`:'Start by analyzing your first resume'}</p>
          </div>
          <Link to="/analyze" className="abtn"><span style={{fontSize:'18px'}}>+</span> Analyze Resume</Link>
        </div>

        {/* Usage */}
        {usage&&(
          <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'14px',padding:'14px 18px',marginBottom:'18px',display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap',animation:'su 0.45s ease 0.08s both'}}>
            <div style={{flex:1,minWidth:'200px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'7px'}}>
                <span style={{color:'var(--text3)',fontSize:'13px',fontWeight:'600'}}>{usage.isGuest?'👤 Guest scans this hour':'📊 Daily scans used'}</span>
                <span style={{color:usage.used>=usage.limit?'#ef4444':'#22c55e',fontWeight:'700',fontSize:'13px'}}>{usage.used}/{usage.limit}</span>
              </div>
              <div style={{height:'5px',background:'var(--border)',borderRadius:'99px',overflow:'hidden'}}>
                <div style={{height:'100%',borderRadius:'99px',transition:'width 1s ease',width:`${Math.min((usage.used/usage.limit)*100,100)}%`,background:usage.used>=usage.limit?'#ef4444':usage.used>=usage.limit*0.8?'#f59e0b':'#22c55e'}}/>
              </div>
            </div>
            {usage.isGuest?<Link to="/register" style={{color:'#4ade80',fontWeight:'700',fontSize:'13px',textDecoration:'none',flexShrink:0}}>Get 25/day free →</Link>:<span style={{color:'var(--text4)',fontSize:'12px',flexShrink:0}}>Resets at midnight</span>}
          </div>
        )}

        {/* Stats */}
        {resumes.length>0&&(
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'18px',animation:'su 0.45s ease 0.16s both'}}>
            {[{v:resumes.length,l:'Total Scans',c:'var(--text)'},{v:lat,l:'Latest Score',c:gc(lat)},{v:best,l:'Best Score',c:gc(best)},{v:tr>0?`+${tr}`:tr===0?'—':tr,l:'vs Last Scan',c:tr>0?'#22c55e':tr<0?'#ef4444':'var(--text4)'}].map((s,i)=>(
              <div key={i} className="scard">
                <p style={{fontSize:'32px',fontWeight:'900',color:s.c,margin:'0 0 4px'}}>{s.v}</p>
                <p style={{fontSize:'11px',color:'var(--text4)',fontWeight:'600',textTransform:'uppercase',letterSpacing:'0.07em',margin:0}}>{s.l}</p>
              </div>
            ))}
          </div>
        )}

        {/* Guest banner */}
        {user?.isGuest&&(
          <div style={{background:'rgba(251,191,36,0.07)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:'13px',padding:'13px 18px',marginBottom:'18px',display:'flex',alignItems:'center',gap:'12px',animation:'su 0.45s ease 0.24s both'}}>
            <span style={{fontSize:'18px'}}>⚡</span>
            <p style={{color:'var(--text2)',fontSize:'14px',margin:0}}>Guest mode. <Link to="/register" style={{color:'#fbbf24',fontWeight:'700',textDecoration:'none'}}>Create a free account</Link> — 25 scans/day, full history, progress tracking.</p>
          </div>
        )}

        {/* Chart */}
        {resumes.length>=2&&(
          <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'18px',padding:'22px',marginBottom:'18px',animation:'su 0.45s ease 0.24s both'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
              <div>
                <p style={{color:'var(--text4)',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.09em',margin:'0 0 4px'}}>Score Progress</p>
                <p style={{color:'var(--text)',fontSize:'15px',fontWeight:'700',margin:0}}>{tr>0?`↑ Up ${tr} pts from last scan`:tr<0?`↓ Down ${Math.abs(tr)} pts — apply the latest feedback`:'Steady — keep making improvements'}</p>
              </div>
              <span style={{color:tr>0?'#22c55e':tr<0?'#ef4444':'var(--text4)',fontSize:'24px',fontWeight:'900'}}>{tr>0?'↗':tr<0?'↘':'→'}</span>
            </div>
            <div style={{height:'160px'}}><Chart resumes={resumes}/></div>
          </div>
        )}

        {/* List */}
        {loading?(
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'60px',gap:'14px'}}>
            <svg style={{animation:'spin 1s linear infinite',width:'28px',height:'28px',color:'#3b82f6'}} fill="none" viewBox="0 0 24 24">
              <circle style={{opacity:0.25}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path style={{opacity:0.75}} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            <span style={{color:'var(--text3)',fontSize:'14px'}}>Loading...</span>
          </div>
        ):resumes.length===0?(
          <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'22px',padding:'60px 40px',textAlign:'center',animation:'su 0.45s ease 0.32s both'}}>
            <div style={{width:'64px',height:'64px',background:'rgba(59,130,246,0.1)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 18px'}}>
              <svg style={{width:'30px',height:'30px',color:'#3b82f6'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h3 style={{fontSize:'20px',fontWeight:'700',color:'var(--text)',marginBottom:'8px'}}>No scans yet</h3>
            <p style={{color:'var(--text3)',fontSize:'14px',marginBottom:'22px',lineHeight:1.7}}>Upload your resume to get your ATS score and detailed AI feedback</p>
            <Link to="/analyze" className="abtn" style={{display:'inline-flex'}}>Analyze your first resume →</Link>
          </div>
        ):(
          <div style={{animation:'su 0.45s ease 0.32s both'}}>
            <p style={{color:'var(--text4)',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.09em',marginBottom:'12px'}}>All Scans</p>
            {resumes.map((r,i)=>(
              <div key={r._id} className="rrow" onClick={()=>navigate(`/results/${r._id}`)} style={{animation:`su 0.4s ease ${i*0.05}s both`}}>
                <div style={{display:'flex',alignItems:'center',gap:'13px',minWidth:0}}>
                  <div style={{width:'40px',height:'40px',background:'rgba(239,68,68,0.1)',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg style={{width:'20px',height:'20px',color:'#f87171'}} fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>
                  </div>
                  <div style={{minWidth:0}}>
                    <p style={{fontWeight:'600',color:'var(--text)',fontSize:'14px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',margin:0}}>{r.fileName}</p>
                    <p style={{color:'var(--text4)',fontSize:'12px',marginTop:'2px',marginBottom:0}}>{new Date(r.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</p>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
                  <span style={{background:gcb(r.atsScore),color:gc(r.atsScore),fontWeight:'700',fontSize:'13px',padding:'4px 12px',borderRadius:'99px',border:`1px solid ${gc(r.atsScore)}30`}}>{r.atsScore}/100</span>
                  <button className="db" onClick={e=>del(r._id,e)}>
                    <svg style={{width:'16px',height:'16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16"/></svg>
                  </button>
                  <svg style={{width:'16px',height:'16px',color:'var(--text4)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
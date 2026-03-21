import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { useTheme } from '../context/ThemeContext'
import { downloadActionPlan } from '../utils/downloadPlan'

const gc = s => s>=80?'#22c55e':s>=60?'#3b82f6':s>=40?'#f59e0b':'#ef4444'
const gl = s => s>=80?'Excellent':s>=60?'Good':s>=40?'Average':'Needs Work'

const Ring = ({ score, size=150, label='ATS Score' }) => {
  const r=50,circ=2*Math.PI*r,offset=circ-(score/100)*circ,col=gc(score)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <p style={{color:'var(--text4)',fontSize:'12px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'14px'}}>{label}</p>
      <div style={{position:'relative',width:`${size}px`,height:`${size}px`}}>
        <svg style={{width:'100%',height:'100%',transform:'rotate(-90deg)'}} viewBox="0 0 116 116">
          <circle cx="58" cy="58" r={r} fill="none" stroke="var(--border)" strokeWidth="9"/>
          <circle cx="58" cy="58" r={r} fill="none" stroke={col} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{transition:'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)',filter:`drop-shadow(0 0 8px ${col}90)`}}/>
        </svg>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <span style={{fontSize:size>120?'40px':'28px',fontWeight:'900',color:col,lineHeight:1}}>{score}</span>
          <span style={{color:'var(--text4)',fontSize:size>120?'14px':'11px'}}>/100</span>
        </div>
      </div>
      <span style={{marginTop:'12px',fontSize:'14px',fontWeight:'700',color:col,background:`${col}18`,padding:'5px 16px',borderRadius:'99px',border:`1px solid ${col}30`}}>{gl(score)}</span>
    </div>
  )
}

const Bar = ({label,value,max=25,col}) => (
  <div style={{marginBottom:'14px'}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
      <span style={{color:'var(--text3)',fontSize:'14px'}}>{label}</span>
      <span style={{color:'var(--text2)',fontSize:'14px',fontWeight:'700'}}>{value}/{max}</span>
    </div>
    <div style={{height:'7px',background:'var(--border)',borderRadius:'99px',overflow:'hidden'}}>
      <div style={{height:'100%',width:`${(value/max)*100}%`,background:col,borderRadius:'99px',boxShadow:`0 0 10px ${col}80`,transition:'width 1.4s cubic-bezier(0.4,0,0.2,1)'}}/>
    </div>
  </div>
)

const SBar = ({label,value}) => {
  const col=gc(value*10)
  return (
    <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
      <span style={{color:'var(--text3)',fontSize:'13px',width:'80px',flexShrink:0}}>{label}</span>
      <div style={{flex:1,height:'6px',background:'var(--border)',borderRadius:'99px',overflow:'hidden'}}>
        <div style={{height:'100%',width:`${value*10}%`,background:col,borderRadius:'99px',transition:'width 1.4s cubic-bezier(0.4,0,0.2,1)'}}/>
      </div>
      <span style={{color:col,fontSize:'13px',fontWeight:'700',width:'32px',textAlign:'right'}}>{value}/10</span>
    </div>
  )
}

const Sev = ({s}) => {
  const m={high:['rgba(239,68,68,0.15)','#ef4444'],medium:['rgba(245,158,11,0.15)','#f59e0b'],low:['rgba(59,130,246,0.15)','#3b82f6'],critical:['rgba(239,68,68,0.2)','#ef4444'],important:['rgba(245,158,11,0.15)','#f59e0b'],'nice-to-have':['rgba(34,197,94,0.12)','#22c55e']}
  const [bg,col]=m[s]||m.low
  return <span style={{background:bg,color:col,fontSize:'11px',fontWeight:'700',padding:'3px 10px',borderRadius:'99px',textTransform:'uppercase',letterSpacing:'0.05em',flexShrink:0,border:`1px solid ${col}30`}}>{s}</span>
}

const SL = ({children}) => <p style={{color:'var(--text4)',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'18px'}}>{children}</p>

const Card = ({children,delay=0,accent}) => (
  <div style={{background:accent?`${accent}08`:'var(--card-bg)',border:`1px solid ${accent?accent+'25':'var(--border)'}`,borderRadius:'18px',padding:'22px',marginBottom:'14px',animation:`fu 0.55s cubic-bezier(0.4,0,0.2,1) ${delay}s both`,transition:'border-color 0.3s'}}>
    {children}
  </div>
)

const parseVerdict = text => {
  if(!text) return {raw:text}
  const sents = text.split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean)
  if(sents.length<=2) return {raw:text}
  const pw=['strong','good','excellent','great','solid','impressive','skilled','proficient','experienced','well']
  const nw=['however','but','lacking','missing','weak','needs','should','could','improve','limited','no ']
  const pos=sents.filter(s=>pw.some(w=>s.toLowerCase().includes(w)))
  const neg=sents.filter(s=>nw.some(w=>s.toLowerCase().includes(w)))
  const neu=sents.filter(s=>!pos.includes(s)&&!neg.includes(s))
  return {pos,neg,neu}
}

const parseBullets = text => {
  if(!text) return []
  return text.split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(s=>s.length>10)
}

export default function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dark } = useTheme()
  const [r,setR]           = useState(null)
  const [loading,setLoad]  = useState(true)
  const [error,setError]   = useState('')
  const [dl,setDl]         = useState(false)

  useEffect(()=>{
    api.get(`/resume/${id}`).then(res=>setR(res.data.resume)).catch(()=>setError('Could not load results.')).finally(()=>setLoad(false))
  },[id])

  const handleDl = () => { setDl(true); downloadActionPlan(r); setTimeout(()=>setDl(false),1500) }

  if(loading) return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px'}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <svg style={{animation:'spin 1s linear infinite',width:'40px',height:'40px',color:'#3b82f6'}} fill="none" viewBox="0 0 24 24"><circle style={{opacity:.2}} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path style={{opacity:.8}} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
      <p style={{color:'var(--text3)',fontSize:'16px'}}>Preparing your results...</p>
    </div>
  )
  if(error) return (
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}><p style={{color:'#ef4444',marginBottom:'16px',fontSize:'16px'}}>{error}</p><button onClick={()=>navigate('/dashboard')} style={{color:'#3b82f6',background:'none',border:'none',cursor:'pointer',fontSize:'15px'}}>← Back to dashboard</button></div>
    </div>
  )

  const bd=r.scoreBreakdown||{}, ss=r.sectionScores||{}
  const ivBullets=parseBullets(r.interviewReadinessNote)
  const verd=parseVerdict(r.overallVerdict)

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)',padding:'24px 16px',transition:'background 0.3s',position:'relative'}}>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes drift{0%,100%{transform:translate(0,0)}50%{transform:translate(22px,-16px)}}
        .rbg{background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;padding:10px 18px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;transition:all 0.25s;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-family:inherit;white-space:nowrap}
        .rbg:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(37,99,235,0.5)}
        .rbo{border:1px solid var(--border2);background:var(--bg2);color:var(--text2);padding:10px 16px;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:all 0.25s;display:inline-flex;align-items:center;gap:6px}
        .rbo:hover{background:var(--bg3)}
        .rbdl{border:1px solid rgba(34,197,94,0.3);background:rgba(34,197,94,0.07);color:#22c55e;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;display:inline-flex;align-items:center;gap:6px;font-family:inherit;white-space:nowrap}
        .rbdl:hover{background:rgba(34,197,94,0.15);border-color:rgba(34,197,94,0.6);transform:translateY(-2px)}
        .rwr,.rbr,.rcr{border-radius:12px;overflow:hidden;border:1px solid var(--border);margin-bottom:10px;transition:border-color 0.25s}
        .rwr:hover{border-color:var(--border2)}
        .rbr:hover{border-color:rgba(59,130,246,0.35)}
        .kc{background:rgba(245,158,11,0.1);color:#f59e0b;border:1px solid rgba(245,158,11,0.25);font-size:14px;font-weight:600;padding:7px 16px;border-radius:99px;cursor:default}
        .qr{display:flex;gap:12px;align-items:flex-start;background:rgba(245,158,11,0.07);border:1px solid rgba(245,158,11,0.18);border-radius:12px;padding:14px 16px;margin-bottom:10px}
        /* Score row — 3 col desktop, stack on mobile */
        .score-row{display:grid;grid-template-columns:200px 1fr 1fr;gap:14px;margin-bottom:14px}
        /* Good/Bad — 2 col desktop, stack on mobile */  
        .two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
        /* Section scores — 2 col */
        .sec-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 32px}
        @media(max-width:640px){
          .score-row{grid-template-columns:1fr !important}
          .two-col{grid-template-columns:1fr !important}
          .sec-grid{grid-template-columns:1fr !important}
          .res-header{flex-direction:column !important;align-items:flex-start !important}
          .res-btns{width:100% !important}
          .res-btns button,.res-btns a{flex:1 !important;justify-content:center !important}
        }
      `}</style>

      {dark&&<>
        <div style={{position:'fixed',top:'8%',right:'3%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(37,99,235,0.08) 0%,transparent 70%)',animation:'drift 16s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'fixed',bottom:'5%',left:'3%',width:'300px',height:'300px',background:'radial-gradient(circle,rgba(124,58,237,0.07) 0%,transparent 70%)',animation:'drift 20s ease-in-out infinite reverse',pointerEvents:'none'}}/>
      </>}

      <div style={{maxWidth:'980px',margin:'0 auto',position:'relative',zIndex:1}}>

        {/* Header */}
        <div className="res-header" style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'20px',flexWrap:'wrap',gap:'12px',animation:'fu 0.5s ease both'}}>
          <div>
            <h1 style={{fontSize:'26px',fontWeight:'900',color:'var(--text)',marginBottom:'4px',letterSpacing:'-0.5px'}}>Resume Analysis</h1>
            <p style={{color:'var(--text3)',fontSize:'13px',margin:0}}>{r.fileName} — {new Date(r.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</p>
          </div>
          <div className="res-btns" style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            <button onClick={handleDl} disabled={dl} className="rbdl">{dl?'⏳':'⬇'} {dl?'Opening...':'Download Plan'}</button>
            <Link to="/analyze" className="rbg">Analyze Another</Link>
            <Link to="/dashboard" className="rbo">Dashboard</Link>
          </div>
        </div>

        {/* Top priority */}
        {r.topRecommendation&&(
          <div style={{background:'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.08))',border:'1px solid rgba(59,130,246,0.25)',borderRadius:'14px',padding:'16px 18px',marginBottom:'14px',display:'flex',gap:'12px',alignItems:'flex-start',animation:'fu 0.5s ease 0.06s both'}}>
            <span style={{fontSize:'20px',flexShrink:0}}>💡</span>
            <div>
              <p style={{color:'#60a5fa',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:'5px'}}>Top Priority Action</p>
              <p style={{color:'var(--text)',fontSize:'15px',lineHeight:1.7,margin:0}}>{r.topRecommendation}</p>
            </div>
          </div>
        )}

        {/* Score row — stacks on mobile */}
        <div className="score-row" style={{animation:'fu 0.5s ease 0.12s both'}}>
          <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'18px',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px 14px'}}>
            <Ring score={r.atsScore}/>
          </div>
          {Object.keys(bd).length>0&&(
            <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'18px',padding:'22px'}}>
              <SL>Score Breakdown</SL>
              <Bar label="Formatting" value={bd.formatting} col="#a78bfa"/>
              <Bar label="Keywords"   value={bd.keywords}   col="#3b82f6"/>
              <Bar label="Experience" value={bd.experience} col="#2dd4bf"/>
              <Bar label="Impact"     value={bd.impact}     col="#f59e0b"/>
            </div>
          )}
          {r.interviewReadiness!==undefined&&(
            <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:'18px',padding:'22px'}}>
              <SL>Interview Readiness</SL>
              <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'14px',flexWrap:'wrap'}}>
                <Ring score={r.interviewReadiness} size={90} label=""/>
                <div>
                  <p style={{color:'var(--text)',fontSize:'18px',fontWeight:'900',margin:'0 0 4px'}}>{r.interviewReadiness>=70?'Ready':r.interviewReadiness>=50?'Almost':'Not Yet'}</p>
                  <p style={{color:'var(--text3)',fontSize:'13px',margin:0}}>{r.interviewReadiness>=70?'Strong candidate':r.interviewReadiness>=50?'A few gaps to fix':'Needs more work'}</p>
                </div>
              </div>
              {ivBullets.slice(0,2).map((pt,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                  <span style={{color:i===0?'#3b82f6':'var(--text3)',fontWeight:'700',flexShrink:0,fontSize:'14px'}}>→</span>
                  <p style={{color:'var(--text2)',fontSize:'13px',lineHeight:1.6,margin:0}}>{pt}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Overall verdict */}
        {r.overallVerdict&&(
          <Card delay={0.18}>
            <SL>Overall Verdict</SL>
            {verd.pos?.length>0||verd.neg?.length>0?(
              <div>
                {verd.neu?.length>0&&<p style={{color:'var(--text)',fontSize:'16px',lineHeight:1.8,marginBottom:'16px',fontWeight:'500'}}>{verd.neu[0]}</p>}
                <div className="two-col" style={{margin:0}}>
                  {verd.pos?.length>0&&(
                    <div style={{background:'rgba(34,197,94,0.06)',border:'1px solid rgba(34,197,94,0.18)',borderRadius:'12px',padding:'14px 16px'}}>
                      <p style={{color:'#22c55e',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'10px'}}>Strengths</p>
                      {verd.pos.map((s,i)=>(
                        <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
                          <span style={{color:'#22c55e',fontWeight:'700',flexShrink:0,fontSize:'14px',marginTop:'1px'}}>✓</span>
                          <p style={{color:'var(--text2)',fontSize:'14px',lineHeight:1.65,margin:0}}>{s}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {verd.neg?.length>0&&(
                    <div style={{background:'rgba(239,68,68,0.05)',border:'1px solid rgba(239,68,68,0.18)',borderRadius:'12px',padding:'14px 16px'}}>
                      <p style={{color:'#ef4444',fontSize:'11px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'10px'}}>Areas to Improve</p>
                      {verd.neg.map((s,i)=>(
                        <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
                          <span style={{color:'#f87171',fontWeight:'700',flexShrink:0,fontSize:'14px',marginTop:'1px'}}>→</span>
                          <p style={{color:'var(--text2)',fontSize:'14px',lineHeight:1.65,margin:0}}>{s}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ):(
              <p style={{color:'var(--text2)',fontSize:'15px',lineHeight:1.9,margin:0}}>{r.overallVerdict}</p>
            )}
          </Card>
        )}

        {/* Good vs Bad */}
        {(r.whatIsGood?.length>0||r.whatIsBad?.length>0)&&(
          <div className="two-col" style={{animation:'fu 0.5s ease 0.22s both'}}>
            {r.whatIsGood?.length>0&&(
              <div style={{background:'rgba(34,197,94,0.05)',border:'1px solid rgba(34,197,94,0.15)',borderRadius:'18px',padding:'20px'}}>
                <SL>What's Good</SL>
                {r.whatIsGood.map((p,i)=>(
                  <div key={i} style={{display:'flex',gap:'10px',marginBottom:'12px',alignItems:'flex-start'}}>
                    <span style={{color:'#22c55e',fontWeight:'700',fontSize:'15px',flexShrink:0,marginTop:'1px'}}>✓</span>
                    <p style={{color:'var(--text2)',fontSize:'14px',lineHeight:1.7,margin:0}}>{p}</p>
                  </div>
                ))}
              </div>
            )}
            {r.whatIsBad?.length>0&&(
              <div style={{background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.14)',borderRadius:'18px',padding:'20px'}}>
                <SL>What Needs Work</SL>
                {r.whatIsBad.map((p,i)=>(
                  <div key={i} style={{display:'flex',gap:'10px',marginBottom:'12px',alignItems:'flex-start'}}>
                    <span style={{color:'#f87171',fontWeight:'700',fontSize:'15px',flexShrink:0,marginTop:'1px'}}>✗</span>
                    <p style={{color:'var(--text2)',fontSize:'14px',lineHeight:1.7,margin:0}}>{p}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section scores */}
        {Object.keys(ss).length>0&&(
          <Card delay={0.26}>
            <SL>Section-by-Section Score</SL>
            <div className="sec-grid">
              {Object.entries(ss).map(([k,v])=><SBar key={k} label={k.charAt(0).toUpperCase()+k.slice(1)} value={v}/>)}
            </div>
          </Card>
        )}

        {/* Critical changes */}
        {r.criticalChanges?.length>0&&(
          <Card delay={0.3}>
            <SL>Critical Changes Required</SL>
            {r.criticalChanges.map((ch,i)=>(
              <div key={i} className="rcr" style={{marginBottom:'10px'}}>
                <div style={{background:'var(--bg2)',padding:'11px 14px',display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
                  <span style={{color:'var(--text3)',fontSize:'10px',fontWeight:'700',background:'var(--bg3)',padding:'3px 10px',borderRadius:'99px',textTransform:'uppercase',letterSpacing:'0.06em',flexShrink:0}}>{ch.section}</span>
                  <p style={{color:'var(--text2)',fontSize:'14px',flex:1,margin:0}}>{ch.issue}</p>
                  <Sev s={ch.priority}/>
                </div>
                <div style={{background:'rgba(59,130,246,0.05)',padding:'11px 14px',borderTop:'1px solid rgba(59,130,246,0.1)'}}>
                  <p style={{color:'#93c5fd',fontSize:'14px',lineHeight:1.7,margin:0}}>→ {ch.fix}</p>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Weaknesses */}
        {r.weaknesses?.length>0&&(
          <Card delay={0.34}>
            <SL>Detailed Weaknesses & Fixes</SL>
            {r.weaknesses.map((w,i)=>(
              <div key={i} className="rwr">
                <div style={{background:'rgba(239,68,68,0.06)',padding:'11px 14px',display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'10px'}}>
                  <div style={{display:'flex',gap:'10px',flex:1}}>
                    <span style={{color:'#f87171',fontWeight:'700',flexShrink:0,marginTop:'2px',fontSize:'15px'}}>✗</span>
                    <p style={{color:'#fca5a5',fontSize:'14px',lineHeight:1.7,margin:0}}>{w.issue}</p>
                  </div>
                  <Sev s={w.severity}/>
                </div>
                <div style={{background:'rgba(34,197,94,0.04)',padding:'11px 14px',borderTop:'1px solid rgba(34,197,94,0.1)'}}>
                  <div style={{display:'flex',gap:'10px'}}>
                    <span style={{color:'#4ade80',fontWeight:'700',flexShrink:0,marginTop:'2px',fontSize:'15px'}}>✓</span>
                    <p style={{color:'rgba(74,222,128,0.85)',fontSize:'14px',lineHeight:1.7,margin:0}}>{w.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}

        {/* Bullet rewrites */}
        {r.rewrittenBullets?.length>0&&(
          <Card delay={0.38}>
            <SL>Rewritten Bullet Points</SL>
            <p style={{color:'var(--text4)',fontSize:'13px',marginTop:'-10px',marginBottom:'16px'}}>Your original → stronger with action verbs, numbers, and clear impact</p>
            {r.rewrittenBullets.map((b,i)=>{
              const isObj=typeof b==='object'&&b!==null
              return (
                <div key={i} className="rbr" style={{marginBottom:'10px'}}>
                  {isObj?(
                    <>
                      <div style={{background:'var(--bg2)',padding:'11px 14px'}}>
                        <p style={{color:'var(--text4)',fontSize:'10px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px'}}>Before</p>
                        <p style={{color:'var(--text3)',fontSize:'14px',lineHeight:1.7,margin:0}}>{b.original}</p>
                      </div>
                      <div style={{background:'rgba(59,130,246,0.07)',padding:'11px 14px',borderTop:'1px solid rgba(59,130,246,0.12)'}}>
                        <p style={{color:'#60a5fa',fontSize:'10px',fontWeight:'700',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'5px'}}>After</p>
                        <p style={{color:'#93c5fd',fontSize:'14px',lineHeight:1.7,fontWeight:'600',margin:0}}>{b.improved}</p>
                        {b.why&&<p style={{color:'rgba(96,165,250,0.4)',fontSize:'12px',marginTop:'6px',fontStyle:'italic',marginBottom:0}}>Why: {b.why}</p>}
                      </div>
                    </>
                  ):(
                    <div style={{background:'rgba(59,130,246,0.07)',padding:'13px 14px',display:'flex',gap:'12px'}}>
                      <span style={{color:'#60a5fa',fontWeight:'800',fontSize:'15px',flexShrink:0}}>{i+1}</span>
                      <p style={{color:'#93c5fd',fontSize:'14px',lineHeight:1.7,margin:0}}>{b}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </Card>
        )}

        {/* Quick wins */}
        {r.quickWins?.length>0&&(
          <Card delay={0.42}>
            <SL>Quick Wins — Do These in 5 Minutes</SL>
            {r.quickWins.map((w,i)=>(
              <div key={i} className="qr">
                <span style={{color:'#f59e0b',fontWeight:'900',fontSize:'16px',flexShrink:0,marginTop:'1px'}}>{i+1}</span>
                <p style={{color:'rgba(245,158,11,0.9)',fontSize:'14px',lineHeight:1.7,margin:0}}>{w}</p>
              </div>
            ))}
          </Card>
        )}

        {/* Role alignment */}
        {r.roleAlignment&&(
          <Card delay={0.46}>
            <SL>Role Alignment</SL>
            <p style={{color:'var(--text2)',fontSize:'15px',lineHeight:1.9,margin:0}}>{r.roleAlignment}</p>
          </Card>
        )}

        {/* Missing keywords */}
        {r.missingKeywords?.length>0&&(
          <Card delay={0.5}>
            <SL>Missing Keywords</SL>
            <p style={{color:'var(--text4)',fontSize:'13px',marginTop:'-10px',marginBottom:'14px'}}>Add these to improve ATS matching for your target role</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
              {r.missingKeywords.map((kw,i)=><span key={i} className="kc">+ {kw}</span>)}
            </div>
          </Card>
        )}

        {/* CTA */}
        <div style={{background:'linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.08))',border:'1px solid rgba(59,130,246,0.2)',borderRadius:'18px',padding:'28px 22px',textAlign:'center',animation:'fu 0.5s ease 0.54s both',marginBottom:'8px'}}>
          <p style={{color:'var(--text)',fontSize:'20px',fontWeight:'800',marginBottom:'8px'}}>Make these changes and scan again</p>
          <p style={{color:'var(--text3)',fontSize:'14px',marginBottom:'20px',lineHeight:1.75}}>Even small improvements push your ATS score by 10–15 points. Start with the Quick Wins above.</p>
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={handleDl} className="rbdl" style={{fontSize:'14px',padding:'11px 22px'}}>⬇ Download Action Plan</button>
            <Link to="/analyze" className="rbg" style={{fontSize:'14px',padding:'11px 22px'}}>Analyze Updated Resume →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
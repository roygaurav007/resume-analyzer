import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import api from '../api/axios'

// ─── Pixel Knight SVG ───────────────────────────────────────────────
const PixelKnight = ({ frame }) => {
  const palette = {
    'H': '#7c8cbc', 'V': '#1a1a2e', 'A': '#5a6aa0',
    'S': '#e8e8ff', 'G': '#f5c842', 'B': '#3a3a5c',
    'W': '#ffffff', '.': null,
  }

  const px = 5
  const grid = [
    ['.', '.', '.', '.', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'H', 'V', 'V', 'V', 'V', 'V', 'V', 'H', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'H', 'V', 'W', 'V', 'V', 'W', 'V', 'H', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', '.', '.', '.', '.'],
    ['.', '.', '.', 'G', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'G', '.', '.', '.'],
    ['.', '.', '.', 'G', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'G', '.', '.', '.'],
    ['.', '.', '.', 'G', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'G', '.', 'S', '.'],
    ['.', '.', '.', '.', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '.', '.', 'S', '.'],
    ['.', '.', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '.', 'S', '.'],
    ['.', '.', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '.', '.', '.'],
    ['.', '.', '.', '.', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '.', '.', '.', '.'],
    ['.', '.', '.', '.', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', '.', '.', '.', '.'],
    ...(frame === 0 ? [
      ['.', '.', '.', 'B', 'B', 'B', 'B', '.', '.', 'B', 'B', 'B', 'B', '.', '.', '.'],
      ['.', '.', '.', 'B', 'B', 'B', 'B', '.', '.', 'B', 'B', 'B', 'B', '.', '.', '.'],
      ['.', '.', '.', 'B', 'B', 'B', 'B', '.', '.', 'B', 'B', 'B', 'B', '.', '.', '.'],
    ] : [
      ['.', '.', 'B', 'B', 'B', 'B', '.', '.', '.', 'B', 'B', 'B', 'B', '.', '.', '.'],
      ['.', 'B', 'B', 'B', 'B', '.', '.', '.', '.', '.', 'B', 'B', 'B', 'B', '.', '.'],
      ['.', 'B', 'B', 'B', '.', '.', '.', '.', '.', '.', 'B', 'B', 'B', 'B', '.', '.'],
    ]),
  ]

  const w = 16 * px
  const h = grid.length * px

  return (
    <svg width={w} height={h} style={{ imageRendering: 'pixelated' }}>
      {grid.map((row, ri) =>
        row.map((cell, ci) => {
          const color = palette[cell]
          if (!color) return null
          return <rect key={`${ri}-${ci}`} x={ci * px} y={ri * px} width={px} height={px} fill={color}/>
        })
      )}
    </svg>
  )
}

const Typewriter = ({ text, speed = 50 }) => {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed(''); setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++; setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); setDone(true) }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  return <span>{displayed}{!done && <span style={{ animation: 'blink 0.7s step-end infinite', fontWeight: '900' }}>|</span>}</span>
}

const KnightMascot = ({ uploaded }) => {
  const [frame, setFrame]   = useState(0)
  const [bounce, setBounce] = useState(0)
  const [msgIdx, setMsgIdx] = useState(0)

  const idleMessages    = ["Welcome, Adventurer!", "Your resume quest begins here!", "I shall guide you to glory!", "Upload thy resume, brave soul!"]
  const uploadedMessages = ["Excellent! The scroll is ready!", "Prepare for battle!", "Now click Analyze!"]
  const messages = uploaded ? uploadedMessages : idleMessages

  useEffect(() => { const t = setInterval(() => setFrame(f => (f + 1) % 2), 500); return () => clearInterval(t) }, [])
  useEffect(() => { const t = setInterval(() => setBounce(b => (b + 1) % 20), 50); return () => clearInterval(t) }, [])
  useEffect(() => { const t = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 4000); return () => clearInterval(t) }, [messages.length])

  const bobY = Math.sin(bounce * Math.PI / 10) * 3

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* Speech bubble */}
      <div style={{ background: 'var(--card-bg)', border: '2px solid var(--border2)', borderRadius: '12px', padding: '10px 14px', maxWidth: '200px', textAlign: 'center', position: 'relative', marginBottom: '10px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text)', fontSize: '11px', fontFamily: '"Courier New", monospace', fontWeight: '700', lineHeight: 1.5, margin: 0 }}>
          <Typewriter key={msgIdx} text={messages[msgIdx]} speed={50}/>
        </p>
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid var(--border2)' }}/>
        <div style={{ position: 'absolute', bottom: '-7px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '9px solid var(--card-bg)' }}/>
      </div>
      {/* Knight */}
      <div style={{ transform: `translateY(${bobY}px)`, transition: 'transform 0.05s linear' }}>
        <PixelKnight frame={frame}/>
      </div>
      {/* Ground */}
      <div style={{ marginTop: '6px', display: 'flex', gap: '3px' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ width: '7px', height: '4px', background: i % 2 === 0 ? '#3a3a5c' : '#2a2a4c', borderRadius: '1px', opacity: 0.5 }}/>
        ))}
      </div>
      {/* Name tag */}
      <div style={{ marginTop: '6px', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: '6px', padding: '3px 10px', fontSize: '10px', fontFamily: '"Courier New", monospace', fontWeight: '700', color: 'white' }}>
        KNIGHT BOT 🗡️
      </div>
    </div>
  )
}

export default function Analyze() {
  const [file, setFile]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const navigate = useNavigate()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: a => { if (a[0]) { setFile(a[0]); setError('') } },
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const submit = async () => {
    if (!file) return setError('Please select a PDF file first')
    setLoading(true); setError('')
    const fd = new FormData(); fd.append('resume', file)
    try {
      const r = await api.post('/resume/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      navigate(`/results/${r.data.resume._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '32px 16px', transition: 'background 0.3s' }}>
      <style>{`
        @keyframes fu   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 18px rgba(37,99,235,0.35)} 50%{box-shadow:0 0 40px rgba(37,99,235,0.65)} }
        @keyframes pulse{ 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes blink{ 0%,100%{opacity:1} 50%{opacity:0} }
        .dz { border:2px dashed var(--border2); border-radius:18px; padding:36px 24px; text-align:center; cursor:pointer; transition:all 0.3s; background:var(--bg2); }
        .dz:hover { border-color:rgba(59,130,246,0.5); background:rgba(59,130,246,0.04); }
        .dz-on { border-color:#3b82f6 !important; background:rgba(59,130,246,0.08) !important; }
        .dz-ok { border-color:rgba(34,197,94,0.5) !important; background:rgba(34,197,94,0.05) !important; }
        .abtn { width:100%; padding:14px; background:linear-gradient(135deg,#2563eb,#7c3aed); color:white; border:none; border-radius:12px; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s; display:flex; align-items:center; justify-content:center; gap:10px; font-family:inherit; animation:glow 3s ease-in-out infinite; }
        .abtn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(37,99,235,0.55); animation:none; }
        .abtn:disabled { opacity:0.5; cursor:not-allowed; transform:none; animation:none; }
        .fchip { display:flex; align-items:center; gap:8px; padding:9px 12px; background:var(--bg2); border:1px solid var(--border); border-radius:10px; }
        /* Desktop: side by side. Mobile: stack */
        .analyze-grid { display:grid; grid-template-columns:1fr 220px; gap:28px; align-items:start; }
        .knight-col { display:flex; flex-direction:column; align-items:center; padding-top:16px; animation:fu 0.6s ease 0.3s both; }
        .feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        @media(max-width:640px){
          .analyze-grid { grid-template-columns:1fr !important; }
          .knight-col { flex-direction:row !important; justify-content:center; padding-top:0 !important; padding:16px 0 !important; order:-1; }
          .feat-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px', animation: 'fu 0.5s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '99px', padding: '5px 16px', marginBottom: '14px' }}>
            <span style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }}/>
            <span style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '600' }}>AI-Powered Analysis</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.8px' }}>Analyze your resume</h1>
          <p style={{ color: 'var(--text3)', fontSize: '15px', lineHeight: 1.75 }}>Upload your PDF and get detailed AI feedback in seconds.</p>
        </div>

        {/* Main grid */}
        <div className="analyze-grid">

          {/* LEFT — upload + features */}
          <div>
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '22px', padding: '22px', marginBottom: '12px', animation: 'fu 0.5s ease 0.1s both' }}>
              <div {...getRootProps()} className={`dz${isDragActive ? ' dz-on' : ''}${file ? ' dz-ok' : ''}`}>
                <input {...getInputProps()}/>
                {file ? (
                  <div>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(34,197,94,0.12)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                      <svg style={{ width: '22px', height: '22px', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <p style={{ color: '#22c55e', fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{file.name}</p>
                    <p style={{ color: 'rgba(34,197,94,0.6)', fontSize: '13px' }}>{(file.size / 1024).toFixed(1)} KB — click to change</p>
                  </div>
                ) : isDragActive ? (
                  <div>
                    <p style={{ color: '#60a5fa', fontWeight: '700', fontSize: '16px' }}>Drop it here!</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                      <svg style={{ width: '22px', height: '22px', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    </div>
                    <p style={{ color: 'var(--text)', fontWeight: '700', fontSize: '15px', marginBottom: '5px' }}>Drag & drop your resume here</p>
                    <p style={{ color: 'var(--text3)', fontSize: '13px' }}>or click to browse — PDF only, max 5MB</p>
                  </div>
                )}
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', borderRadius: '10px', padding: '11px 14px', fontSize: '14px', marginTop: '14px' }}>
                  {error}
                </div>
              )}

              <button onClick={submit} disabled={!file || loading} className="abtn" style={{ marginTop: '16px' }}>
                {loading ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite', width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    AI is analyzing your resume...
                  </>
                ) : 'Analyze Resume →'}
              </button>
              {loading && <p style={{ textAlign: 'center', color: 'var(--text4)', fontSize: '13px', marginTop: '8px' }}>Takes 10–20 seconds. The knight is reviewing...</p>}
            </div>

            {/* Feature chips */}
            <div style={{ animation: 'fu 0.5s ease 0.2s both' }}>
              <p style={{ color: 'var(--text4)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '10px' }}>What you'll get</p>
              <div className="feat-grid">
                {[
                  { icon: '🎯', text: 'ATS score out of 100' },
                  { icon: '📊', text: '4-point score breakdown' },
                  { icon: '⚠️', text: 'Specific weaknesses + fixes' },
                  { icon: '✍️', text: 'Before/after bullet rewrites' },
                  { icon: '💡', text: 'Quick wins in 5 minutes' },
                  { icon: '🔍', text: 'Missing keywords to add' },
                  { icon: '✅', text: 'What you did well' },
                  { icon: '🗺️', text: 'Role alignment guidance' },
                ].map((f, i) => (
                  <div key={i} className="fchip" style={{ animation: `fu 0.4s ease ${0.25 + i * 0.04}s both` }}>
                    <span style={{ fontSize: '14px' }}>{f.icon}</span>
                    <span style={{ color: 'var(--text2)', fontSize: '13px' }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Knight mascot (moves above on mobile) */}
          <div className="knight-col">
            <KnightMascot uploaded={!!file}/>
          </div>
        </div>
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Landing() {
  const { dark } = useTheme()

  const features = [
    { icon: '🎯', title: 'ATS Score', desc: 'Get a realistic 0–100 score with a 4-point breakdown — Formatting, Keywords, Experience, Impact.' },
    { icon: '✍️', title: 'Bullet Rewrites', desc: 'Your weak bullet points rewritten with action verbs, real numbers, and clear impact statements.' },
    { icon: '⚠️', title: 'Weaknesses & Fixes', desc: 'Specific problems in your resume with exact fixes. Not generic advice — references your actual content.' },
    { icon: '💡', title: 'Quick Wins', desc: 'Small changes you can make in 5 minutes that push your score up by 10–15 points immediately.' },
    { icon: '🔍', title: 'Missing Keywords', desc: 'Keywords ATS systems scan for that are missing from your resume for your target role.' },
    { icon: '🗺️', title: 'Role Alignment', desc: 'Exactly which roles and companies you\'re ready for now — and which are a stretch goal.' },
  ]

  const steps = [
    { num: '01', title: 'Upload your PDF', desc: 'Drag and drop your resume. No signup needed to start.' },
    { num: '02', title: 'AI reviews it', desc: 'LLaMA 3.3 70B analyzes it like a senior recruiter with 15 years of experience.' },
    { num: '03', title: 'Get your action plan', desc: 'Full breakdown of your score, what to fix, and how. Download it as a PDF.' },
  ]

  const stats = [
    { val: '20s', label: 'Average analysis time' },
    { val: '15+', label: 'Data points analyzed' },
    { val: '100%', label: 'Free to use' },
    { val: '0', label: 'Signup required to try' },
  ]

  // Color Constants from Login Page logic
  const c = {
    b1: dark ? 'rgba(37,99,235,0.22)' : 'rgba(37,99,235,0.1)',
    b2: dark ? 'rgba(124,58,237,0.18)' : 'rgba(124,58,237,0.08)',
    b3: dark ? 'rgba(52,211,153,0.1)' : 'rgba(52,211,153,0.07)',
    sc: dark ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.12)',
    st: dark ? 'white' : '#3b82f6',
    gr: dark ? 'rgba(255,255,255,0.02)' : 'rgba(37,99,235,0.05)',
    o1: dark ? '#60a5fa' : '#3b82f6',
    o2: dark ? '#a78bfa' : '#8b5cf6',
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", transition: 'background 0.3s', position: 'relative', overflowX: 'hidden' }}>
      <style>{`
        /* Animations from Login Page */
        @keyframes b1{0%,100%{transform:translate(0,0) scale(1)}45%{transform:translate(50px,-35px) scale(1.08)}75%{transform:translate(-20px,25px) scale(0.94)}}
        @keyframes b2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-35px,20px) scale(1.06)}70%{transform:translate(25px,-15px) scale(0.95)}}
        @keyframes b3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(20px,28px) scale(1.1)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(37,99,235,0.45)}50%{box-shadow:0 0 50px rgba(37,99,235,0.8),0 0 80px rgba(124,58,237,0.3)}}
        @keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes orb1{to{transform:rotate(360deg) translateX(120px) rotate(-360deg)}}
        @keyframes orb2{to{transform:rotate(-360deg) translateX(80px) rotate(360deg)}}
        @keyframes tw{0%,100%{opacity:0.15;transform:scale(0.7)}50%{opacity:0.9;transform:scale(1.5)}}
        @keyframes scan{0%{top:0;opacity:0.7}100%{top:100%;opacity:0}}
        @keyframes lp{0%{opacity:0;transform:translateY(18px) scale(0.8)}60%{transform:translateY(-3px) scale(1.04)}100%{opacity:1;transform:translateY(0) scale(1)}}

        /* Landing Page Specifics */
        .feat-card { background:var(--card-bg); border:1px solid var(--border); border-radius:18px; padding:24px; transition:all 0.3s; position:relative; z-index:2; }
        .feat-card:hover { border-color:rgba(37,99,235,0.4); transform:translateY(-4px); box-shadow:0 12px 40px rgba(37,99,235,0.1); }
        .try-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 36px; background:linear-gradient(135deg,#2563eb,#7c3aed); color:white; border-radius:14px; font-size:18px; font-weight:700; text-decoration:none; transition:all 0.3s; animation:glow 3s ease-in-out infinite; }
        .try-btn:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(37,99,235,0.6); animation:none; }
        .sec-btn { display:inline-flex; align-items:center; gap:8px; padding:16px 28px; background:var(--bg2); border:1px solid var(--border2); color:var(--text); border-radius:14px; font-size:16px; font-weight:600; text-decoration:none; transition:all 0.3s; }
        .sec-btn:hover { background:var(--bg3); transform:translateY(-2px); }
        .stat-card { background:var(--card-bg); border:1px solid var(--border); border-radius:16px; padding:24px; text-align:center; position:relative; z-index:2; }
        .step-num { width:48px; height:48px; border-radius:14px; background:linear-gradient(135deg,rgba(37,99,235,0.15),rgba(124,58,237,0.15)); border:1px solid rgba(37,99,235,0.25); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:900; color:#60a5fa; flex-shrink:0; }

        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
        .feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:768px) {
          .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
          .feat-grid { grid-template-columns:1fr !important; }
          .steps-grid { grid-template-columns:1fr !important; }
          .hero-h { font-size:36px !important; }
          .hero-sub { font-size:16px !important; }
        }
      `}</style>

      {/* ── SHARED BACKGROUND ANIMATIONS ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Blobs */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '600px', height: '600px', background: `radial-gradient(circle,${c.b1} 0%,transparent 65%)`, animation: 'b1 14s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '500px', height: '500px', background: `radial-gradient(circle,${c.b2} 0%,transparent 65%)`, animation: 'b2 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', width: '400px', height: '400px', background: `radial-gradient(circle,${c.b3} 0%,transparent 65%)`, animation: 'b3 11s ease-in-out infinite', transform: 'translateX(-50%)' }} />
        
        {/* Grid Overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${c.gr} 1px,transparent 1px),linear-gradient(90deg,${c.gr} 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        {/* Scanning Line */}
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: `linear-gradient(90deg,transparent,${c.sc},transparent)`, animation: 'scan 8s linear infinite' }} />
        
        {/* Twinkling Stars */}
        {[{ t: '5%', l: '10%' }, { t: '15%', l: '80%' }, { t: '45%', l: '5%' }, { t: '80%', l: '90%' }, { t: '70%', l: '20%' }].map((s, i) => (
          <div key={i} style={{ position: 'absolute', top: s.t, left: s.l, width: '3px', height: '3px', borderRadius: '50%', background: c.st, animation: `tw ${3 + i}s ease-in-out infinite` }} />
        ))}
      </div>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 24px 64px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          
          {/* Animated Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '99px', padding: '6px 18px', marginBottom: '28px', animation: 'fu 0.6s ease both' }}>
            <span style={{ width: '7px', height: '7px', background: '#3b82f6', borderRadius: '50%', animation: 'glow 2s ease-in-out infinite', flexShrink: 0 }} />
            <span style={{ color: '#60a5fa', fontSize: '14px', fontWeight: '600' }}>Free AI Resume Analyzer — No Signup Required</span>
          </div>

          {/* Letter-by-Letter Headline */}
          <h1 className="hero-h" style={{ fontSize: '64px', fontWeight: '900', color: 'var(--text)', lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-2px' }}>
            <div style={{ marginBottom: '10px' }}>
              {'Get your resume'.split('').map((ch, i) => (
                <span key={i} style={{ display: 'inline-block', animation: `lp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s both` }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </div>
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'grad 4s ease infinite' }}>
              interview-ready
            </span>
          </h1>

          <p className="hero-sub" style={{ fontSize: '20px', color: 'var(--text3)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', animation: 'fu 0.6s ease 0.4s both' }}>
            Upload your PDF resume and get a brutally honest AI review — ATS score, specific fixes, rewritten bullets, and a full action plan. In 20 seconds.
          </p>

          <div className="hero-btns" style={{ animation: 'fu 0.6s ease 0.6s both' }}>
            <Link to="/analyze" className="try-btn">
              🚀 Analyze My Resume Free
            </Link>
            <Link to="/templates" className="sec-btn">
              📄 Get ATS Templates
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '0 24px 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card" style={{ animation: `fu 0.6s ease ${0.8 + i * 0.1}s both` }}>
                <p style={{ fontSize: '36px', fontWeight: '900', color: '#60a5fa', margin: '0 0 6px', letterSpacing: '-1px' }}>{s.val}</p>
                <p style={{ fontSize: '13px', color: 'var(--text3)', margin: 0, fontWeight: '500' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '0 24px 72px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', margin: 0, letterSpacing: '-0.5px' }}>Three steps to a better resume</h2>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px 24px', animation: `fu 0.6s ease ${1 + i * 0.1}s both`, position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div className="step-num">{s.num}</div>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '0 24px 72px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', margin: 0, letterSpacing: '-0.5px' }}>Everything to fix your resume</h2>
          </div>
          <div className="feat-grid">
            {features.map((f, i) => (
              <div key={i} className="feat-card" style={{ animation: `fu 0.6s ease ${1.2 + i * 0.05}s both` }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '14px' }}>R</span>
          </div>
          <span style={{ fontWeight: '800', color: 'var(--text)', fontSize: '18px' }}>ResumeAI</span>
        </div>
        <p style={{ color: 'var(--text4)', fontSize: '13px', margin: 0 }}>
          Built with MERN + Groq LLaMA 3.3 + a lot of coffee:☕ · Free forever
          By Gaurav roy
       
        </p>
      </footer>
    </div>
  )
}
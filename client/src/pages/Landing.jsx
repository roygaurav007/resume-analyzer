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

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: "'Segoe UI', sans-serif", transition: 'background 0.3s' }}>
      <style>{`
        @keyframes fu { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes grad { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(37,99,235,0.4)} 50%{box-shadow:0 0 40px rgba(37,99,235,0.7)} }
        .feat-card { background:var(--card-bg); border:1px solid var(--border); border-radius:18px; padding:24px; transition:all 0.3s; }
        .feat-card:hover { border-color:rgba(37,99,235,0.4); transform:translateY(-4px); box-shadow:0 12px 40px rgba(37,99,235,0.1); }
        .try-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 36px; background:linear-gradient(135deg,#2563eb,#7c3aed); color:white; border-radius:14px; font-size:18px; font-weight:700; text-decoration:none; transition:all 0.3s; animation:glow 3s ease-in-out infinite; }
        .try-btn:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(37,99,235,0.6); animation:none; }
        .sec-btn { display:inline-flex; align-items:center; gap:8px; padding:16px 28px; background:var(--bg2); border:1px solid var(--border2); color:var(--text); border-radius:14px; font-size:16px; font-weight:600; text-decoration:none; transition:all 0.3s; }
        .sec-btn:hover { background:var(--bg3); transform:translateY(-2px); }
        .stat-card { background:var(--card-bg); border:1px solid var(--border); border-radius:16px; padding:24px; text-align:center; }
        .step-num { width:48px; height:48px; border-radius:14px; background:linear-gradient(135deg,rgba(37,99,235,0.15),rgba(124,58,237,0.15)); border:1px solid rgba(37,99,235,0.25); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:900; color:#60a5fa; flex-shrink:0; }
        /* Mobile adjustments */
        .hero-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
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

      {/* ── HERO ── */}
      <section style={{ padding: '80px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: `radial-gradient(ellipse,${dark?'rgba(37,99,235,0.12)':'rgba(37,99,235,0.07)'} 0%,transparent 70%)`, pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '780px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '99px', padding: '6px 18px', marginBottom: '28px', animation: 'fu 0.5s ease both' }}>
            <span style={{ width: '7px', height: '7px', background: '#3b82f6', borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }}/>
            <span style={{ color: '#60a5fa', fontSize: '14px', fontWeight: '600' }}>Free AI Resume Analyzer — No Signup Required</span>
          </div>

          {/* Headline */}
          <h1 className="hero-h" style={{ fontSize: '56px', fontWeight: '900', color: 'var(--text)', lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-1.5px', animation: 'fu 0.5s ease 0.1s both' }}>
            Get your resume<br/>
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'grad 4s ease infinite' }}>
              interview-ready
            </span>
          </h1>

          {/* Subheading */}
          <p className="hero-sub" style={{ fontSize: '20px', color: 'var(--text3)', lineHeight: 1.75, marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px', animation: 'fu 0.5s ease 0.2s both' }}>
            Upload your PDF resume and get a brutally honest AI review — ATS score, specific fixes, rewritten bullets, and a full action plan. In 20 seconds.
          </p>

          {/* CTAs */}
          <div className="hero-btns" style={{ animation: 'fu 0.5s ease 0.3s both' }}>
            <Link to="/analyze" className="try-btn">
              🚀 Analyze My Resume Free
            </Link>
            <Link to="/templates" className="sec-btn">
              📄 Get ATS Templates
            </Link>
          </div>

          <p style={{ color: 'var(--text4)', fontSize: '13px', marginTop: '16px', animation: 'fu 0.5s ease 0.4s both' }}>
            No credit card · No signup · Works instantly
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '0 24px 64px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card" style={{ animation: `fu 0.5s ease ${0.1 + i * 0.08}s both` }}>
                <p style={{ fontSize: '36px', fontWeight: '900', color: '#60a5fa', margin: '0 0 6px', letterSpacing: '-1px' }}>{s.val}</p>
                <p style={{ fontSize: '13px', color: 'var(--text3)', margin: 0, fontWeight: '500' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: 'var(--text4)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>How It Works</p>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', margin: 0, letterSpacing: '-0.5px' }}>Three steps to a better resume</h2>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={i} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px 24px', animation: `fu 0.5s ease ${0.1 + i * 0.1}s both` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div className="step-num">{s.num}</div>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}/>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ color: 'var(--text4)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>What You Get</p>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text)', margin: 0, letterSpacing: '-0.5px' }}>Everything to fix your resume</h2>
          </div>
          <div className="feat-grid">
            {features.map((f, i) => (
              <div key={i} className="feat-card" style={{ animation: `fu 0.5s ease ${0.05 + i * 0.07}s both` }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE RESULT ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.06))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '24px', padding: '40px 32px' }}>
            <p style={{ color: 'var(--text4)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Sample AI Feedback</p>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Score */}
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '6px solid #f59e0b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '900', color: '#f59e0b' }}>52</span>
                  <span style={{ color: 'var(--text4)', fontSize: '12px' }}>/100</span>
                </div>
                <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700', background: 'rgba(245,158,11,0.1)', padding: '3px 12px', borderRadius: '99px', border: '1px solid rgba(245,158,11,0.3)' }}>Average</span>
              </div>
              {/* Feedback snippets */}
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '12px', padding: '12px 16px', marginBottom: '10px' }}>
                  <p style={{ color: '#f87171', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>✗ Issue Found</p>
                  <p style={{ color: 'var(--text2)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>Bullet points lack measurable impact. "Worked on backend APIs" tells recruiters nothing.</p>
                </div>
                <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '12px', padding: '12px 16px' }}>
                  <p style={{ color: '#4ade80', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>✓ Suggested Fix</p>
                  <p style={{ color: 'var(--text2)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>"Built 12 REST APIs using Node.js + Express, reducing response time by 40% and serving 500+ daily active users."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES TEASER ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '48px 32px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📄</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text)', marginBottom: '10px', letterSpacing: '-0.5px' }}>Free ATS-Friendly Templates</h2>
          <p style={{ color: 'var(--text3)', fontSize: '16px', lineHeight: 1.75, marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px' }}>
            Download clean, ATS-optimized resume templates for Software Engineers, Freshers, Data Scientists, and more. No fluff, no graphics — just templates that actually get past ATS filters.
          </p>
          <Link to="/templates" className="try-btn" style={{ display: 'inline-flex', fontSize: '16px', padding: '14px 32px' }}>
            Browse Templates →
          </Link>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--text)', marginBottom: '14px', letterSpacing: '-0.8px' }}>
            Ready to fix your resume?
          </h2>
          <p style={{ color: 'var(--text3)', fontSize: '17px', marginBottom: '32px', lineHeight: 1.7 }}>
            Takes 20 seconds. No signup. Completely free.
          </p>
          <Link to="/analyze" className="try-btn" style={{ fontSize: '17px', padding: '16px 40px' }}>
            🚀 Analyze My Resume Now
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: '900', fontSize: '12px' }}>R</span>
          </div>
          <span style={{ fontWeight: '800', color: 'var(--text)', fontSize: '15px' }}>ResumeAI</span>
        </div>
        <p style={{ color: 'var(--text4)', fontSize: '13px', margin: 0 }}>
          Built with MERN + Groq LLaMA 3.3 · Free forever ·{' '}
          <Link to="/analyze" style={{ color: '#3b82f6', textDecoration: 'none' }}>Try it now</Link>
          {' · '}
          <Link to="/templates" style={{ color: '#3b82f6', textDecoration: 'none' }}>Templates</Link>
        </p>
      </footer>
    </div>
  )
}
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const templates = [
  {
    id: 'swe',
    title: 'Software Engineer',
    badge: '⭐ Most Popular',
    badgeColor: '#f59e0b',
    desc: 'Perfect for MERN, Java, Python, or any backend/frontend role. Emphasizes projects, tech stack, and impact.',
    tags: ['MERN Stack', 'Backend', 'Frontend', 'Full Stack'],
    sections: ['Contact Info', 'Summary', 'Skills', 'Experience', 'Projects', 'Education', 'Certifications'],
    color: '#3b82f6',
    content: `[YOUR NAME]
[Phone] | [Email] | [LinkedIn] | [GitHub] | [City, State]

─────────────────────────────────────────────────────
PROFESSIONAL SUMMARY
─────────────────────────────────────────────────────
Results-driven Software Engineer with [X] years of experience building scalable web applications using the MERN stack. Proficient in JavaScript, React, Node.js, and MongoDB. Delivered [specific achievement, e.g., "a real-time analytics dashboard serving 10,000+ daily users"]. Passionate about clean code and performance optimization.

─────────────────────────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────────────────────────
Languages:    JavaScript, TypeScript, Java, Python, SQL
Frontend:     React.js, Next.js, HTML5, CSS3, Tailwind CSS
Backend:      Node.js, Express.js, REST APIs, GraphQL
Databases:    MongoDB, MySQL, PostgreSQL, Redis
Tools:        Git, Docker, AWS, Postman, VS Code, Linux
Others:       Data Structures & Algorithms, System Design

─────────────────────────────────────────────────────
PROJECTS
─────────────────────────────────────────────────────
[Project Name 1] | [Tech Stack Used] | [Live Link] | [GitHub]
• Built [what it does] using [technologies], serving [X users / handling X requests/day]
• Reduced [metric] by [X%] by implementing [specific optimization or feature]
• Integrated [API/library/service] to enable [specific functionality]

[Project Name 2] | [Tech Stack Used] | [Live Link] | [GitHub]
• Developed [feature/system] that [specific outcome with numbers]
• Implemented [JWT auth / real-time / payment gateway / etc.] for [reason]
• Deployed on [Vercel/Render/AWS] with [CI/CD pipeline / Docker / etc.]

─────────────────────────────────────────────────────
EXPERIENCE
─────────────────────────────────────────────────────
[Job Title] | [Company Name] | [City] | [Month Year – Month Year]
• Developed [X feature/system] using [technologies] that resulted in [measurable outcome]
• Collaborated with a team of [X] engineers to [deliver/build/migrate] [system/feature]
• Reduced [bug count / load time / API response time] by [X%] through [what you did]
• Wrote [unit/integration] tests covering [X%] of codebase using [Jest/Mocha/etc.]

─────────────────────────────────────────────────────
EDUCATION
─────────────────────────────────────────────────────
[Degree Name, e.g., B.Tech in Computer Science]
[University Name] | [City] | [Month Year – Month Year]
CGPA: [X.X/10] | Relevant Coursework: Data Structures, Algorithms, DBMS, OS, Networks

─────────────────────────────────────────────────────
CERTIFICATIONS & ACHIEVEMENTS
─────────────────────────────────────────────────────
• [Certification Name] — [Issuing Organization], [Year]
• [Hackathon/Competition] — [Position], [Event Name], [Year]
• [Open Source / Community contribution, if any]

─────────────────────────────────────────────────────
ATS TIPS FOR THIS TEMPLATE:
• Use exact keywords from the job description (e.g., "REST API", "Agile", "CI/CD")
• Every bullet must have a number — users, %, requests, lines of code, time saved
• Keep to 1 page if under 3 years experience, 2 pages max otherwise
• Use simple fonts: Arial, Calibri, or Times New Roman — no graphics or columns
─────────────────────────────────────────────────────`
  },
  {
    id: 'fresher',
    title: 'Fresher / Entry Level',
    badge: '🎓 For Students',
    badgeColor: '#22c55e',
    desc: 'Designed for final-year students and recent graduates with limited work experience. Highlights projects and skills.',
    tags: ['No Experience', 'Internship', 'Entry Level', 'Campus Placement'],
    sections: ['Contact Info', 'Summary', 'Skills', 'Projects', 'Education', 'Internships', 'Achievements'],
    color: '#22c55e',
    content: `[YOUR NAME]
[Phone] | [Email] | [LinkedIn] | [GitHub] | [City, State]

─────────────────────────────────────────────────────
OBJECTIVE
─────────────────────────────────────────────────────
Motivated [Degree] student at [University] with hands-on experience building [type of projects]. Seeking a [target role] position where I can apply my skills in [key skill 1], [key skill 2], and [key skill 3] to contribute to real-world products. Strong foundation in Data Structures and Algorithms with [X] problems solved on LeetCode.

─────────────────────────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────────────────────────
Languages:    [e.g., Java, Python, JavaScript, C++]
Web:          [e.g., HTML, CSS, React, Node.js]
Databases:    [e.g., MySQL, MongoDB]
Tools:        Git, GitHub, VS Code, Postman
DSA:          Arrays, Linked Lists, Trees, Graphs, DP — [X]+ problems on LeetCode

─────────────────────────────────────────────────────
PROJECTS
─────────────────────────────────────────────────────
[Project Name 1] | [Tech Stack] | [GitHub Link] | [Live Link if any]
• Built [what it does] — [why it's useful / who uses it]
• Implemented [specific feature: authentication / payment / real-time chat / etc.]
• [Any metric: X users, X records in DB, deployed on X platform]

[Project Name 2] | [Tech Stack] | [GitHub Link]
• Developed [what it does] using [technologies]
• [Specific technical challenge you solved]
• [Any achievement: won hackathon / used by X people / featured somewhere]

[Project Name 3] | [Tech Stack] | [GitHub Link]
• [What it does in one line]
• [Most impressive technical aspect]

─────────────────────────────────────────────────────
EDUCATION
─────────────────────────────────────────────────────
[Degree, e.g., B.Tech in Computer Science Engineering]
[University Name] | [City] | [Expected Graduation: Month Year]
CGPA: [X.X/10 or X%]

[12th / Intermediate]
[School Name] | [Board] | [Year] | [Percentage/Marks]

─────────────────────────────────────────────────────
INTERNSHIPS
─────────────────────────────────────────────────────
[Role, e.g., Web Development Intern] | [Company] | [Month Year – Month Year]
• [What you built or contributed to]
• [Technologies used]
• [Any measurable outcome]

(If no internship: add a "Training / Courses" section instead)

─────────────────────────────────────────────────────
ACHIEVEMENTS & EXTRACURRICULARS
─────────────────────────────────────────────────────
• [LeetCode / CodeChef / Codeforces rating or problem count]
• [Hackathon: position, event name, year]
• [Relevant club / society / position of responsibility]
• [Any scholarship, award, or recognition]

─────────────────────────────────────────────────────
ATS TIPS FOR FRESHERS:
• Lead with projects, not education — projects are your experience
• Each project bullet must answer: What + How + Result (with numbers if possible)
• Include your CGPA only if it's above 7.0/10 or 70%
• Add LeetCode/DSA info — many companies filter on this
• Keep it to exactly 1 page — no exceptions for freshers
─────────────────────────────────────────────────────`
  },
  {
    id: 'ds',
    title: 'Data Science / ML',
    badge: '🤖 AI/ML Focused',
    badgeColor: '#a78bfa',
    desc: 'Built for Data Science, ML Engineering, and AI roles. Highlights Python, models, datasets, and research.',
    tags: ['Data Science', 'Machine Learning', 'Python', 'AI/ML'],
    sections: ['Contact Info', 'Summary', 'Skills', 'Projects', 'Experience', 'Education', 'Publications'],
    color: '#a78bfa',
    content: `[YOUR NAME]
[Phone] | [Email] | [LinkedIn] | [GitHub] | [Kaggle Profile] | [City, State]

─────────────────────────────────────────────────────
PROFESSIONAL SUMMARY
─────────────────────────────────────────────────────
Data Science professional with [X] years of experience building and deploying ML models for [domain: e.g., NLP, computer vision, recommendation systems]. Proficient in Python, scikit-learn, TensorFlow, and SQL. Delivered [specific result, e.g., "a churn prediction model improving retention by 18%"]. Strong foundation in statistics and data-driven decision making.

─────────────────────────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────────────────────────
Languages:    Python, SQL, R (optional)
ML/DL:        scikit-learn, TensorFlow, PyTorch, Keras, XGBoost
NLP:          NLTK, spaCy, HuggingFace Transformers, BERT
Data:         Pandas, NumPy, Matplotlib, Seaborn, Plotly
Databases:    MySQL, PostgreSQL, MongoDB
Tools:        Jupyter, Git, Docker, AWS SageMaker, MLflow, Airflow
Statistics:   Hypothesis Testing, A/B Testing, Regression, Bayesian Methods

─────────────────────────────────────────────────────
PROJECTS
─────────────────────────────────────────────────────
[Project Name 1] | Python, [Libraries] | [GitHub] | [Demo if any]
• Built a [type: classification/regression/NLP/CV] model using [algorithm] on [dataset]
• Achieved [X%] accuracy / [X] F1-score, outperforming baseline by [X%]
• Deployed as [REST API / Streamlit app / web service] handling [X] predictions/day

[Project Name 2] | Python, [Libraries] | [GitHub]
• [What it does in one line with the dataset size or domain]
• Performed [EDA / feature engineering / hyperparameter tuning] resulting in [improvement]
• [Any production deployment, paper, or competition result]

─────────────────────────────────────────────────────
EXPERIENCE
─────────────────────────────────────────────────────
[Job Title, e.g., Data Science Intern] | [Company] | [Month Year – Month Year]
• Analyzed [X GB / X million records] of [data type] using Python and SQL
• Built [model type] that improved [metric] by [X%], saving [time/cost]
• Created [dashboards / reports / visualizations] for [stakeholders / business team]
• Collaborated with [engineering / product] team to integrate model into [system]

─────────────────────────────────────────────────────
EDUCATION
─────────────────────────────────────────────────────
[Degree, e.g., B.Tech in Computer Science / B.Sc in Statistics / M.Tech in AI]
[University Name] | [City] | [Year]
CGPA: [X.X/10] | Relevant Courses: ML, Deep Learning, Statistics, Linear Algebra

─────────────────────────────────────────────────────
CERTIFICATIONS & COMPETITIONS
─────────────────────────────────────────────────────
• [IBM / Google / Coursera / deeplearning.ai certification name], [Year]
• Kaggle: [Competition name] — Top [X%] / [Position], [Year]
• [Any research paper / blog / open source contribution]

─────────────────────────────────────────────────────
ATS TIPS FOR DATA SCIENCE:
• Always mention the model type AND the metric (accuracy, F1, AUC-ROC)
• Include dataset size — "trained on 500K records" signals real experience
• Spell out acronyms: "Natural Language Processing (NLP)" — ATS may miss just "NLP"
• List both the library AND what you used it for: "PyTorch for CNN image classification"
• Add Kaggle profile URL if you have a public rank or competition medals
─────────────────────────────────────────────────────`
  },
  {
    id: 'nontech',
    title: 'Non-Tech / MBA / Business',
    badge: '💼 Business Roles',
    badgeColor: '#f59e0b',
    desc: 'For business, finance, marketing, operations, and MBA roles. Clean format with focus on impact and leadership.',
    tags: ['MBA', 'Finance', 'Marketing', 'Operations', 'Management'],
    sections: ['Contact Info', 'Summary', 'Skills', 'Experience', 'Education', 'Achievements', 'Leadership'],
    color: '#f59e0b',
    content: `[YOUR NAME]
[Phone] | [Email] | [LinkedIn] | [City, State]

─────────────────────────────────────────────────────
PROFESSIONAL SUMMARY
─────────────────────────────────────────────────────
Results-oriented [role, e.g., Business Analyst / Marketing Manager] with [X] years of experience in [domain: e.g., financial analysis, growth marketing, operations management]. Track record of [key achievement, e.g., "driving 30% revenue growth" or "reducing operational costs by ₹50L"]. Skilled in [3 key skills]. MBA from [University] with specialization in [specialization].

─────────────────────────────────────────────────────
CORE COMPETENCIES
─────────────────────────────────────────────────────
• Financial Modeling & Analysis      • Market Research & Analysis
• Business Development               • Project Management (PMP / Agile)
• Data Analysis (Excel, SQL, Power BI) • Strategic Planning
• Stakeholder Communication          • P&L Management

─────────────────────────────────────────────────────
PROFESSIONAL EXPERIENCE
─────────────────────────────────────────────────────
[Job Title] | [Company Name] | [City] | [Month Year – Month Year]
• [Led/Managed/Developed/Executed] [what] resulting in [X% improvement / ₹X revenue / X users]
• [Collaborated/Partnered] with [team/stakeholders] to [achieve/deliver] [outcome]
• [Analyzed/Built/Created] [report/model/process] that [reduced costs by X% / saved X hours weekly]
• [Managed/Oversaw] [budget of ₹X / team of X / project worth ₹X]

[Previous Job Title] | [Company] | [Month Year – Month Year]
• [Achievement-first bullet with numbers]
• [Cross-functional work or leadership]
• [Cost savings, revenue impact, or efficiency gain]

─────────────────────────────────────────────────────
EDUCATION
─────────────────────────────────────────────────────
[MBA / PGDM / Master's Degree]
[Institute Name] | [City] | [Year]
Specialization: [Finance / Marketing / Operations / Strategy]
CGPA: [X.X/10] | Key Courses: [Course 1, Course 2, Course 3]

[Bachelor's Degree]
[University Name] | [City] | [Year] | [Score/CGPA]

─────────────────────────────────────────────────────
KEY ACHIEVEMENTS
─────────────────────────────────────────────────────
• [Specific award, recognition, or measurable achievement with numbers]
• [Revenue generated, cost saved, or process improved with X% or ₹X figure]
• [Competition win, case study result, or leadership milestone]

─────────────────────────────────────────────────────
LEADERSHIP & ACTIVITIES
─────────────────────────────────────────────────────
• [Club / Society / Committee] — [Position], [Institute], [Year]
• [Volunteer / CSR activity] — [Organization], [Impact if any]
• [Sports / Cultural achievement at national/state level, if relevant]

─────────────────────────────────────────────────────
TOOLS & SOFTWARE
─────────────────────────────────────────────────────
MS Excel (Advanced), Power BI, Tableau, SQL, SAP, Salesforce, Google Analytics, Python (Basic)

─────────────────────────────────────────────────────
ATS TIPS FOR BUSINESS/MBA:
• Lead every bullet with a strong action verb: Led, Drove, Generated, Reduced, Built
• Every achievement needs a number: %, ₹ amount, headcount, time saved
• Mirror keywords from the JD exactly — "P&L management" not just "profit and loss"
• Include your MBA institute prominently — it's your biggest differentiator
• Keep sections in this order: Summary → Experience → Education → Achievements
─────────────────────────────────────────────────────`
  },
  {
    id: 'intern',
    title: 'Internship Seeker',
    badge: '🚀 For 2nd/3rd Year',
    badgeColor: '#2dd4bf',
    desc: 'Specifically designed for 2nd and 3rd year students seeking their first internship. Compact and impactful.',
    tags: ['Internship', '2nd Year', '3rd Year', 'Summer Internship'],
    sections: ['Contact Info', 'Objective', 'Skills', 'Projects', 'Education', 'Coursework', 'Achievements'],
    color: '#2dd4bf',
    content: `[YOUR NAME]
[Phone] | [Email] | [LinkedIn] | [GitHub] | [City, State]
[Current Year of Study, e.g., "3rd Year B.Tech CSE Student at XYZ University"]

─────────────────────────────────────────────────────
OBJECTIVE
─────────────────────────────────────────────────────
3rd year B.Tech [Branch] student at [University] seeking a [duration, e.g., 2-month] Summer Internship in [target domain: Software Development / Data Science / Product / etc.]. Skilled in [Skill 1], [Skill 2], and [Skill 3] with [X] personal projects shipped. Looking to contribute to real-world products while learning from industry professionals.

─────────────────────────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────────────────────────
Languages:  [e.g., C++, Java, Python, JavaScript]
Web Dev:    [e.g., HTML, CSS, React, Node.js — list only what you actually know]
Tools:      Git, GitHub, VS Code
DSA:        [X]+ problems solved on LeetCode | [Rating] on CodeChef/Codeforces

─────────────────────────────────────────────────────
PROJECTS (Most impressive first)
─────────────────────────────────────────────────────
[Project Name] | [Tech Stack] | [GitHub] | [Live Link if any]
• [What it does — be specific, name the domain and user]
• [Hardest technical thing you built in this project]
• [Any real usage: X friends use it / deployed online / won a hackathon]

[Project Name] | [Tech Stack] | [GitHub]
• [What it does]
• [A specific feature you're proud of]

─────────────────────────────────────────────────────
EDUCATION
─────────────────────────────────────────────────────
B.Tech in [Branch] — [University Name] | [City] | [Expected: Year]
Current CGPA: [X.X/10]

[12th] — [School] | [Board] | [Year] | [Score]

─────────────────────────────────────────────────────
RELEVANT COURSEWORK
─────────────────────────────────────────────────────
Data Structures & Algorithms | Object-Oriented Programming | Database Management Systems
Operating Systems | Computer Networks | [Any relevant ongoing courses]

─────────────────────────────────────────────────────
ACHIEVEMENTS
─────────────────────────────────────────────────────
• [LeetCode: X problems / Top X% / contest rating]
• [Hackathon: Name, Position, Year]
• [Academic: Scholarship, rank, or topper]
• [Online course: Certification from Coursera/Udemy/etc. if relevant]

─────────────────────────────────────────────────────
ATS TIPS FOR INTERNSHIP SEEKERS:
• Your projects ARE your experience — treat each one seriously
• If a project is live online, include the URL — it shows initiative
• 1 page strictly — no exceptions
• If CGPA is below 7, leave it out unless the company specifically asks
• Customize the Objective for each company you apply to
• Add your GitHub prominently — recruiters WILL check it
─────────────────────────────────────────────────────`
  }
]

export default function Templates() {
  const { dark } = useTheme()
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)

  const download = (t) => {
    const blob = new Blob([t.content], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `ResumeAI_${t.title.replace(/\//g,'_').replace(/ /g,'_')}_Template.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copy = (t) => {
    navigator.clipboard.writeText(t.content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px 20px', fontFamily: "'Segoe UI', sans-serif", transition: 'background 0.3s' }}>
      <style>{`
        @keyframes fu { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes grad { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .tcard { background:var(--card-bg); border:1px solid var(--border); border-radius:20px; padding:24px; cursor:pointer; transition:all 0.3s; }
        .tcard:hover { transform:translateY(-4px); box-shadow:0 12px 40px rgba(0,0,0,0.15); }
        .tag { font-size:11px; font-weight:600; padding:4px 10px; border-radius:99px; background:var(--bg2); border:1px solid var(--border); color:var(--text3); }
        .dbtn { padding:11px 22px; border-radius:10px; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.25s; border:none; font-family:inherit; display:inline-flex; align-items:center; gap:8px; }
        .dbtn:hover { transform:translateY(-2px); }
        .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:200; display:flex; align-items:flex-start; justify-content:center; padding:20px; overflow-y:auto; backdrop-filter:blur(4px); }
        .modal { background:var(--bg); border:1px solid var(--border); border-radius:24px; width:100%; max-width:740px; margin:auto; overflow:hidden; }
        .tmpl-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media(max-width:768px) {
          .tmpl-grid { grid-template-columns:1fr !important; }
        }
        @media(min-width:769px) and (max-width:1024px) {
          .tmpl-grid { grid-template-columns:repeat(2,1fr) !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px', animation: 'fu 0.5s ease both' }}>
          <p style={{ color: 'var(--text4)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Free Templates</p>
          <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'var(--text)', marginBottom: '14px', letterSpacing: '-1px' }}>
            ATS-Friendly Resume{' '}
            <span style={{ background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'grad 4s ease infinite' }}>
              Templates
            </span>
          </h1>
          <p style={{ color: 'var(--text3)', fontSize: '17px', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 20px' }}>
            Clean, simple, ATS-optimized templates that actually get past filters. No graphics, no columns, no fluff — just resumes that work.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 20px' }}>
            {['✅ ATS Optimized', '📄 Plain Text Format', '💯 Free Forever'].map((t, i) => (
              <span key={i} style={{ color: 'var(--text3)', fontSize: '13px', fontWeight: '500' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Template cards */}
        <div className="tmpl-grid">
          {templates.map((t, i) => (
            <div key={t.id} className="tcard" style={{ animation: `fu 0.5s ease ${i * 0.08}s both`, borderTop: `3px solid ${t.color}` }}>
              {/* Badge */}
              <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', color: t.badgeColor, background: `${t.badgeColor}15`, border: `1px solid ${t.badgeColor}30`, padding: '3px 10px', borderRadius: '99px', marginBottom: '12px' }}>
                {t.badge}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', marginBottom: '8px' }}>{t.title}</h3>
              <p style={{ color: 'var(--text3)', fontSize: '13px', lineHeight: 1.65, marginBottom: '16px' }}>{t.desc}</p>

              {/* Sections list */}
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: 'var(--text4)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>Sections Included</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {t.sections.map((s, j) => (
                    <span key={j} className="tag">{s}</span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                {t.tags.map((tag, j) => (
                  <span key={j} style={{ fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '99px', background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}>{tag}</span>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setSelected(t)} className="dbtn" style={{ flex: 1, background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}30` }}>
                  👁 Preview
                </button>
                <button onClick={() => download(t)} className="dbtn" style={{ flex: 1, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: 'white' }}>
                  ⬇ Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div style={{ marginTop: '48px', background: 'linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.06))', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text)', marginBottom: '10px' }}>How to use these templates</h3>
          <p style={{ color: 'var(--text3)', fontSize: '15px', lineHeight: 1.75, marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
            Download the .txt file → Fill in your details → Copy into Word/Google Docs → Export as PDF → Upload here to get your ATS score.
          </p>
          <Link to="/analyze" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: 'white', borderRadius: '11px', fontWeight: '700', textDecoration: 'none', fontSize: '15px' }}>
            🚀 Analyze My Resume →
          </Link>
        </div>
      </div>

      {/* Preview Modal */}
      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 2px' }}>{selected.title} Template</h3>
                <p style={{ color: 'var(--text4)', fontSize: '13px', margin: 0 }}>Click anywhere outside to close</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => copy(selected)} className="dbtn" style={{ background: 'var(--bg2)', color: 'var(--text2)', border: '1px solid var(--border)', padding: '9px 16px', fontSize: '13px' }}>
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
                <button onClick={() => download(selected)} className="dbtn" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: 'white', padding: '9px 16px', fontSize: '13px' }}>
                  ⬇ Download
                </button>
                <button onClick={() => setSelected(null)} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--text3)', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            </div>
            {/* Template content */}
            <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
              <pre style={{ background: dark ? '#0d1117' : '#f6f8fa', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', fontSize: '12px', lineHeight: 1.8, color: dark ? '#e6edf3' : '#24292f', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0, fontFamily: '"Courier New", Consolas, monospace' }}>
                {selected.content}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
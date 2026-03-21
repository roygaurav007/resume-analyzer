export const downloadActionPlan = (resume) => {
  const gc = s => s>=80?'#22c55e':s>=60?'#3b82f6':s>=40?'#f59e0b':'#ef4444'
  const gl = s => s>=80?'Excellent':s>=60?'Good':s>=40?'Average':'Needs Work'
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Resume Action Plan — ${resume.fileName}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;color:#1e293b;padding:40px;max-width:780px;margin:0 auto}
@media print{body{padding:20px}.np{display:none !important}section{break-inside:avoid}}
.hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;padding-bottom:20px;border-bottom:3px solid #e2e8f0}
.logo{display:flex;align-items:center;gap:10px}.lb{width:38px;height:38px;background:linear-gradient(135deg,#2563eb,#7c3aed);border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:900}
.sr{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
.sb{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;text-align:center}
.bw{height:6px;background:#e2e8f0;border-radius:99px;overflow:hidden;margin-top:8px}.bf{height:100%;border-radius:99px}
section{margin-bottom:24px}.st{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #f1f5f9}
.vd{background:#f8fafc;border-left:4px solid #2563eb;border-radius:8px;padding:14px 18px;font-size:15px;line-height:1.7;color:#334155}
.gb{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.gx{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px}.rx{background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:14px}
.it{display:flex;gap:8px;margin-bottom:6px;align-items:flex-start;font-size:13px;line-height:1.6}
.cc{border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:10px}
.ct{background:#f8fafc;padding:10px 14px;display:flex;align-items:center;gap:10px}.cb{padding:10px 14px;font-size:13px;color:#374151;line-height:1.6}
.wc{border-radius:10px;overflow:hidden;margin-bottom:10px;border:1px solid #e2e8f0}
.wi{background:#fef2f2;padding:10px 14px;font-size:13px;color:#dc2626;font-weight:500}
.wf{background:#f0fdf4;padding:10px 14px;font-size:13px;color:#166534;line-height:1.6}
.bc{border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin-bottom:10px}
.bb{background:#f8fafc;padding:10px 14px}.ba{background:#eff6ff;padding:10px 14px}
.ls{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:4px}
.kw{display:flex;flex-wrap:wrap;gap:8px}.ki{background:#fffbeb;color:#92400e;border:1px solid #fde68a;font-size:12px;font-weight:600;padding:4px 12px;border-radius:99px}
.qw{display:flex;gap:10px;background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:11px 14px;margin-bottom:8px;font-size:13px;color:#78350f;line-height:1.6;align-items:flex-start}
.rb{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-size:14px;line-height:1.75;color:#334155}
.cta{background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;border-radius:14px;padding:24px;text-align:center;margin-top:28px}
.pb{position:fixed;bottom:24px;right:24px;background:linear-gradient(135deg,#2563eb,#7c3aed);color:white;border:none;padding:12px 22px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(37,99,235,0.5);font-family:inherit}
</style></head><body>
<button class="pb np" onclick="window.print()">⬇ Save as PDF</button>
<div class="hdr">
  <div class="logo"><div class="lb">R</div><div><div style="font-size:20px;font-weight:900;color:#0f172a">ResumeAI</div><div style="font-size:12px;color:#64748b">AI Resume Analyzer</div></div></div>
  <div style="text-align:right"><div style="font-weight:700;font-size:14px;color:#1e293b">${resume.fileName}</div><div style="font-size:12px;color:#94a3b8">Analyzed ${new Date(resume.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</div></div>
</div>
<div class="sr">
  <div class="sb"><div style="font-size:32px;font-weight:900;color:${gc(resume.atsScore)}">${resume.atsScore}</div><div style="font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">ATS Score</div><div class="bw"><div class="bf" style="width:${resume.atsScore}%;background:${gc(resume.atsScore)}"></div></div><div style="font-size:11px;color:${gc(resume.atsScore)};margin-top:4px;font-weight:700">${gl(resume.atsScore)}</div></div>
  ${resume.interviewReadiness!==undefined?`<div class="sb"><div style="font-size:32px;font-weight:900;color:${gc(resume.interviewReadiness)}">${resume.interviewReadiness}</div><div style="font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.06em">Interview Ready</div><div class="bw"><div class="bf" style="width:${resume.interviewReadiness}%;background:${gc(resume.interviewReadiness)}"></div></div></div>`:''}
  ${resume.scoreBreakdown?`<div class="sb" style="grid-column:span 2"><div style="font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px">Score Breakdown</div>${Object.entries(resume.scoreBreakdown).map(([k,v])=>`<div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px"><span style="color:#64748b;text-transform:capitalize">${k}</span><span style="font-weight:700">${v}/25</span></div><div class="bw" style="margin-bottom:6px"><div class="bf" style="width:${(v/25)*100}%;background:#3b82f6"></div></div>`).join('')}</div>`:''}
</div>
${resume.overallVerdict?`<section><div class="st">Overall Verdict</div><div class="vd">${resume.overallVerdict}</div></section>`:''}
${(resume.whatIsGood?.length||resume.whatIsBad?.length)?`<section><div class="st">What's Good vs What Needs Work</div><div class="gb">${resume.whatIsGood?.length?`<div class="gx"><div style="color:#16a34a;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">✓ What's Good</div>${resume.whatIsGood.map(p=>`<div class="it"><span style="color:#16a34a;font-weight:700;flex-shrink:0">✓</span><span>${p}</span></div>`).join('')}</div>`:''}${resume.whatIsBad?.length?`<div class="rx"><div style="color:#dc2626;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px">✗ Needs Work</div>${resume.whatIsBad.map(p=>`<div class="it"><span style="color:#dc2626;font-weight:700;flex-shrink:0">✗</span><span>${p}</span></div>`).join('')}</div>`:''}</div></section>`:''}
${resume.topRecommendation?`<section><div class="st">Top Priority Action</div><div style="background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;padding:14px 18px;font-size:15px;line-height:1.7;color:#1e3a5f;font-weight:500">💡 ${resume.topRecommendation}</div></section>`:''}
${resume.criticalChanges?.length?`<section><div class="st">Critical Changes Required</div>${resume.criticalChanges.map(ch=>`<div class="cc"><div class="ct"><span style="background:#e2e8f0;color:#475569;font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;text-transform:uppercase">${ch.section}</span><span style="font-size:13px;color:#334155;flex:1">${ch.issue}</span><span style="background:#fee2e2;color:#dc2626;font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px">${ch.priority}</span></div><div class="cb">→ ${ch.fix}</div></div>`).join('')}</section>`:''}
${resume.weaknesses?.length?`<section><div class="st">Weaknesses & Fixes</div>${resume.weaknesses.map(w=>`<div class="wc"><div class="wi">✗ ${w.issue}</div><div class="wf">✓ ${w.fix}</div></div>`).join('')}</section>`:''}
${resume.rewrittenBullets?.length?`<section><div class="st">Rewritten Bullet Points</div>${resume.rewrittenBullets.map(b=>{const io=typeof b==='object'&&b!==null;return io?`<div class="bc"><div class="bb"><div class="ls" style="color:#64748b">Before</div><div style="font-size:13px;color:#475569;line-height:1.6">${b.original}</div></div><div class="ba"><div class="ls" style="color:#2563eb">After</div><div style="font-size:13px;color:#1e3a5f;font-weight:500;line-height:1.6">${b.improved}</div>${b.why?`<div style="font-size:11px;color:#93c5fd;margin-top:4px;font-style:italic">Why: ${b.why}</div>`:''}</div></div>`:`<div class="bc"><div class="ba"><div style="font-size:13px;color:#1e3a5f;font-weight:500;line-height:1.6">${b}</div></div></div>`}).join('')}</section>`:''}
${resume.quickWins?.length?`<section><div class="st">Quick Wins — 5 Minutes</div>${resume.quickWins.map((w,i)=>`<div class="qw"><span style="font-weight:900;color:#d97706;flex-shrink:0">${i+1}</span><span>${w}</span></div>`).join('')}</section>`:''}
${resume.roleAlignment?`<section><div class="st">Role Alignment</div><div class="rb">${resume.roleAlignment}</div></section>`:''}
${resume.missingKeywords?.length?`<section><div class="st">Missing Keywords</div><div class="kw">${resume.missingKeywords.map(kw=>`<span class="ki">+ ${kw}</span>`).join('')}</div></section>`:''}
<div class="cta np"><h3 style="font-size:18px;font-weight:800;margin-bottom:6px">Make these changes and scan again</h3><p style="font-size:13px;opacity:0.8">Start with the Quick Wins. Even small improvements boost your score by 10–15 points.</p></div>
</body></html>`
  const blob = new Blob([html],{type:'text/html'})
  const url  = URL.createObjectURL(blob)
  const win  = window.open(url,'_blank')
  if(win) win.onload = () => setTimeout(()=>URL.revokeObjectURL(url),5000)
}
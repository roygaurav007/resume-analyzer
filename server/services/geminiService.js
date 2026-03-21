const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText) => {
  const prompt = `You are a brutally honest senior technical recruiter at a top tech company with 15 years experience reviewing 10,000+ resumes. You give SPECIFIC, DETAILED, ACTIONABLE feedback referencing ACTUAL content from the resume.

FIRST — determine if this is actually a resume. A resume must contain at least some of: name, contact info, work experience, education, skills, or projects. If the uploaded text is NOT a resume (e.g. it's a random document, article, blank page, or gibberish), respond with ONLY this JSON:
{
  "notAResume": true,
  "message": "This does not appear to be a resume. Please upload a PDF of your actual resume."
}

If it IS a resume, analyze it and respond ONLY with raw valid JSON. No markdown, no code blocks, no explanation.

SCORING RULES — be realistic and harsh, most fresher resumes score 35-55:
- 80-100: Exceptional resume, ready to apply to top companies right now
- 65-79: Good resume with minor issues, competitive for most roles
- 50-64: Average resume, needs meaningful improvements
- 35-49: Below average, significant work needed
- 0-34: Poor resume, major overhaul required
- Never give above 75 unless the resume is genuinely outstanding with quantified achievements, strong formatting, and relevant keywords
- Most fresher/student resumes should score 35-60
- Deduct heavily for: missing numbers/metrics, weak bullet points, no impact statements, poor formatting, missing keywords, generic summaries

Return this exact structure:
{
  "notAResume": false,
  "atsScore": <realistic number 0-100, be harsh>,
  "scoreBreakdown": {
    "formatting": <0-25, most freshers get 12-18>,
    "keywords": <0-25, most freshers get 8-15>,
    "experience": <0-25, most freshers get 8-14>,
    "impact": <0-25, most freshers get 5-12>
  },
  "overallVerdict": "<2-3 sentences. Name the candidate. State their level. What is the strongest thing? What is the single biggest problem? Be direct and specific.>",
  "whatIsGood": [
    "<specific good thing referencing actual content>",
    "<specific good thing>",
    "<specific good thing>"
  ],
  "whatIsBad": [
    "<specific bad thing referencing actual content>",
    "<specific bad thing>",
    "<specific bad thing>"
  ],
  "criticalChanges": [
    {
      "section": "<Summary/Experience/Projects/Skills/Education/Formatting>",
      "issue": "<specific problem referencing actual content>",
      "fix": "<exact fix with rewritten example>",
      "priority": "critical"
    },
    {
      "section": "<section>",
      "issue": "<specific problem>",
      "fix": "<exact fix with example>",
      "priority": "important"
    },
    {
      "section": "<section>",
      "issue": "<specific problem>",
      "fix": "<exact fix with example>",
      "priority": "nice-to-have"
    }
  ],
  "weaknesses": [
    { "issue": "<specific weakness referencing actual resume content>", "fix": "<exact actionable fix with example rewrite>", "severity": "high" },
    { "issue": "<specific weakness>", "fix": "<exact fix>", "severity": "medium" },
    { "issue": "<specific weakness>", "fix": "<exact fix>", "severity": "low" }
  ],
  "rewrittenBullets": [
    { "original": "<copy exact weak bullet from resume>", "improved": "<rewrite with strong action verb + specific numbers + clear impact>", "why": "<1 sentence explaining improvement>" },
    { "original": "<copy exact weak bullet>", "improved": "<rewrite>", "why": "<explanation>" },
    { "original": "<copy exact weak bullet>", "improved": "<rewrite>", "why": "<explanation>" }
  ],
  "missingKeywords": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>", "<keyword6>"],
  "strongPoints": [
    "<specific strength with evidence from resume>",
    "<specific strength with evidence>"
  ],
  "topRecommendation": "<the single most important change — be specific, reference actual content>",
  "interviewReadiness": <number 0-100, be realistic — most freshers are 30-55>,
  "interviewReadinessNote": "<1-2 sentences on why this score>",
  "sectionScores": {
    "summary": <0-10>,
    "experience": <0-10>,
    "projects": <0-10>,
    "skills": <0-10>,
    "education": <0-10>
  },
  "quickWins": [
    "<small change doable in 5 minutes with big impact>",
    "<quick win>",
    "<quick win>"
  ],
  "roleAlignment": "<which roles/companies is this resume best suited for right now, and which are a stretch? Be specific.>"
}

Resume to analyze:
${resumeText}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 3000,
    });

    let text = completion.choices[0].message.content;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(text);

    // If AI flagged it as not a resume, throw a user-friendly error
    if (parsed.notAResume) {
      throw new Error(parsed.message || 'This does not appear to be a resume. Please upload your actual resume PDF.');
    }

    return parsed;
  } catch (error) {
    // Pass through user-friendly errors
    if (error.message.includes('does not appear to be a resume')) {
      throw error;
    }
    console.error('AI error:', error.message);
    throw new Error('Failed to analyze resume. Please try again.');
  }
};

module.exports = { analyzeResume };
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText) => {
  const prompt = `You are a brutally honest senior technical recruiter at a top tech company with 15 years experience. You have reviewed 10,000+ resumes. You give SPECIFIC, DETAILED, ACTIONABLE feedback. You reference ACTUAL content from the resume — names, projects, technologies, bullet points you actually see. Never give generic advice.

Analyze this resume thoroughly. Respond ONLY with raw valid JSON. No markdown, no code blocks, no explanation.

Return this exact structure:
{
  "atsScore": <realistic number 0-100>,
  "scoreBreakdown": {
    "formatting": <0-25>,
    "keywords": <0-25>,
    "experience": <0-25>,
    "impact": <0-25>
  },
  "overallVerdict": "<2-3 sentences. Name the candidate. State their level (fresher/junior/mid). What is the single strongest thing about this resume? What is the single biggest problem holding it back? Be direct and specific.>",
  "whatIsGood": [
    "<specific good thing you actually see in the resume — mention the actual project/tech/section>",
    "<specific good thing>",
    "<specific good thing>"
  ],
  "whatIsBad": [
    "<specific bad thing referencing actual content in the resume>",
    "<specific bad thing>",
    "<specific bad thing>"
  ],
  "criticalChanges": [
    {
      "section": "<which section: Summary/Experience/Projects/Skills/Education/Formatting>",
      "issue": "<specific problem referencing actual content>",
      "fix": "<exact fix — include a rewritten example where possible>",
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
    { "original": "<copy exact weak bullet from resume>", "improved": "<rewrite with strong action verb + specific numbers + clear impact>", "why": "<1 sentence explaining what makes the improved version better>" },
    { "original": "<copy exact weak bullet>", "improved": "<rewrite>", "why": "<explanation>" },
    { "original": "<copy exact weak bullet>", "improved": "<rewrite>", "why": "<explanation>" }
  ],
  "missingKeywords": ["<keyword1>", "<keyword2>", "<keyword3>", "<keyword4>", "<keyword5>", "<keyword6>"],
  "strongPoints": [
    "<specific strength with evidence from resume>",
    "<specific strength with evidence>"
  ],
  "topRecommendation": "<the single most important change — be specific, reference actual content>",
  "interviewReadiness": <number 0-100>,
  "interviewReadinessNote": "<1-2 sentences on why this score — what would make them more ready>",
  "sectionScores": {
    "summary": <0-10>,
    "experience": <0-10>,
    "projects": <0-10>,
    "skills": <0-10>,
    "education": <0-10>
  },
  "quickWins": [
    "<small change that can be done in 5 minutes with big impact>",
    "<quick win>",
    "<quick win>"
  ],
  "roleAlignment": "<which roles/companies is this resume best suited for right now, and which roles are a stretch? Be specific.>"
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
    return parsed;
  } catch (error) {
    console.error('FULL ERROR:', error.message);
    throw new Error('Failed to analyze resume with AI. Please try again.');
  }
};

module.exports = { analyzeResume };
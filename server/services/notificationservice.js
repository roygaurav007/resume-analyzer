const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTIFY_EMAIL,
    pass: process.env.NOTIFY_APP_PASSWORD,
  },
});

const sendNotification = async (subject, htmlContent) => {
  try {
    if (!process.env.NOTIFY_EMAIL || !process.env.NOTIFY_APP_PASSWORD) return;
    await transporter.sendMail({
      from: `"ResumeAI Alerts" <${process.env.NOTIFY_EMAIL}>`,
      to: process.env.NOTIFY_EMAIL,
      subject,
      html: htmlContent,
    });
  } catch (err) {
    console.error('Notification error:', err.message);
  }
};

const emailTemplate = (title, color, rows) => `
  <div style="font-family:'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#0f172a;border-radius:16px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#2563eb,#7c3aed);padding:24px 28px;">
      <h2 style="color:white;margin:0;font-size:20px;font-weight:800;">ResumeAI</h2>
    </div>
    <div style="padding:24px 28px;">
      <div style="display:inline-block;background:${color}20;border:1px solid ${color}40;color:${color};font-size:13px;font-weight:700;padding:4px 14px;border-radius:99px;margin-bottom:18px;">${title}</div>
      <table style="width:100%;border-collapse:collapse;">
        ${rows.map(([label, value]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.45);font-size:13px;width:130px;">${label}</td>
            <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.85);font-size:14px;font-weight:600;">${value}</td>
          </tr>
        `).join('')}
      </table>
    </div>
    <div style="padding:14px 28px;background:rgba(255,255,255,0.03);">
      <p style="color:rgba(255,255,255,0.25);font-size:12px;margin:0;">${new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' })} IST</p>
    </div>
  </div>
`;

const notifyRegister = (name, email) =>
  sendNotification(`🎉 New User — ${name}`, emailTemplate('New Registration', '#22c55e', [['Name', name], ['Email', email], ['Time', new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' }) + ' IST']]));

const notifyLogin = (name, email) =>
  sendNotification(`🔐 Login — ${name}`, emailTemplate('User Login', '#3b82f6', [['Name', name], ['Email', email], ['Time', new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' }) + ' IST']]));

const notifyGuest = () =>
  sendNotification(`👤 Guest Session`, emailTemplate('Guest Login', '#f59e0b', [['Type', 'Guest User'], ['Time', new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' }) + ' IST']]));

const notifyAnalysis = (name, email, fileName, atsScore) =>
  sendNotification(`📄 Resume Analyzed — ${atsScore}/100`, emailTemplate('Resume Analyzed', '#a78bfa', [['User', name], ['Email', email], ['File', fileName], ['Score', `${atsScore}/100`], ['Time', new Date().toLocaleString('en-IN', { timeZone:'Asia/Kolkata' }) + ' IST']]));

module.exports = { notifyRegister, notifyLogin, notifyGuest, notifyAnalysis };

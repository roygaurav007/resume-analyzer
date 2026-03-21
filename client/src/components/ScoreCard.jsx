export default function ScoreCard({ score }) {
  const getColor = (s) => {
    if (s >= 80) return { stroke: '#16a34a', text: 'text-green-600', label: 'Excellent', bg: 'bg-green-50' }
    if (s >= 60) return { stroke: '#2563eb', text: 'text-blue-600', label: 'Good', bg: 'bg-blue-50' }
    if (s >= 40) return { stroke: '#d97706', text: 'text-amber-600', label: 'Average', bg: 'bg-amber-50' }
    return { stroke: '#dc2626', text: 'text-red-600', label: 'Needs Work', bg: 'bg-red-50' }
  }

  const color = getColor(score)
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={`rounded-2xl ${color.bg} p-6 flex flex-col items-center`}>
      <p className="text-slate-600 text-sm font-medium mb-3">ATS Score</p>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color.text}`}>{score}</span>
          <span className="text-slate-400 text-xs">/100</span>
        </div>
      </div>
      <span className={`mt-3 text-sm font-semibold ${color.text}`}>{color.label}</span>
    </div>
  )
}

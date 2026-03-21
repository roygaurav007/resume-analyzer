export default function FeedbackCard({ title, icon, children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-slate-800 text-lg">{title}</h3>
      </div>
      {children}
    </div>
  )
}

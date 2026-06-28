import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

import { getHistory } from "../services/firestore"

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="
      bg-[#0e1830]
      border border-white/10
      rounded-2xl
      px-4 py-3
      shadow-xl
    ">
      <div className="text-slate-400 text-xs mb-1">{label}</div>
      <div className={`
        font-semibold text-sm
        ${d.label === "Positive" ? "text-emerald-400" : d.label === "Negative" ? "text-red-400" : "text-slate-300"}
      `}>
        {d.label} · {d.score?.toFixed(3)}
      </div>
    </div>
  )
}

export default function SentimentHistory({ symbol }) {

  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getHistory(symbol)
      .then(setData)
      .finally(() => setLoading(false))
  }, [symbol])

  if (loading) {
    return (
      <div className="
        flex justify-center items-center
        h-40
        text-slate-400 text-sm
      ">
        Loading trend data…
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="
        flex justify-center items-center
        h-40
        text-slate-400 text-sm
      ">
        No history yet — analyze this stock to start tracking trends.
      </div>
    )
  }

  return (
    <div className="mt-2 mb-6">

      <div className="
        text-sm
        text-slate-500
        dark:text-slate-400
        mb-4
      ">
        Sentiment score over time ({data.length} run{data.length !== 1 ? "s" : ""})
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />

          <XAxis
            dataKey="date"
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[-1, 1]}
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />

          <Tooltip content={<CustomTooltip />} />

          <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
          <ReferenceLine y={0.15}  stroke="rgba(52,211,153,0.2)" strokeDasharray="4 4" />
          <ReferenceLine y={-0.15} stroke="rgba(248,113,113,0.2)" strokeDasharray="4 4" />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#22d3ee"
            strokeWidth={2.5}
            dot={{ fill: "#22d3ee", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#22d3ee" }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}

import {
  TrendingUp,
  TrendingDown,
  Minus,
  Newspaper,
  Activity
} from "lucide-react"

export default function SentimentAnalytics({
  company
}) {

  function sentimentConfig(label) {

    if (label === "Positive") {

      return {
        icon: TrendingUp,

        color: "text-emerald-500 dark:text-emerald-400",

        bg: "bg-emerald-400/10",

        border: "border-emerald-400/20",

        progress: "bg-emerald-400",

        text: "Bullish"
      }
    }

    if (label === "Negative") {

      return {
        icon: TrendingDown,

        color: "text-red-500 dark:text-red-400",

        bg: "bg-red-400/10",

        border: "border-red-400/20",

        progress: "bg-red-400",

        text: "Bearish"
      }
    }

    return {
      icon: Minus,

      color: "text-slate-500 dark:text-slate-300",

      bg: "bg-slate-200/70 dark:bg-white/[0.05]",

      border: "border-slate-200 dark:border-white/10",

      progress: "bg-slate-400",

      text: "Neutral"
    }
  }

  const config = sentimentConfig(company.label)

  const Icon = config.icon

  const percentage = Math.min(
    100,
    Math.abs(company.score * 100)
  )

  return (
    <div className="
      grid
      grid-cols-1
      md:grid-cols-3

      gap-4

      mb-8
    ">

      {/* Overall Sentiment */}

      <div className={`
        rounded-3xl

        border

        px-5
        py-5

        backdrop-blur-xl

        shadow-sm
        dark:shadow-none

        ${config.bg}
        ${config.border}
      `}>

        <div className="
          flex
          items-center
          gap-3

          mb-4
        ">

          <div className={`
            w-12
            h-12

            rounded-2xl

            flex
            items-center
            justify-center

            ${config.bg}
          `}>

            <Icon
              size={24}
              className={config.color}
            />

          </div>

          <div>

            <div className="
              text-slate-500
              dark:text-slate-400

              text-sm
            ">
              Market Mood
            </div>

            <div className={`
              text-xl
              font-semibold

              ${config.color}
            `}>
              {config.text}
            </div>

          </div>

        </div>

        <div className="
          w-full
          h-2

          rounded-full

          bg-slate-200
          dark:bg-white/[0.06]

          overflow-hidden
        ">

          <div
            className={`
              h-full
              rounded-full

              ${config.progress}
            `}
            style={{
              width: `${percentage}%`
            }}
          />

        </div>

      </div>

      {/* Confidence */}

      <div className="
        rounded-3xl

        border
        border-slate-200
        dark:border-white/10

        bg-slate-50
        dark:bg-white/[0.04]

        backdrop-blur-xl

        shadow-sm
        dark:shadow-none

        px-5
        py-5
      ">

        <div className="
          flex
          items-center
          gap-3

          mb-4
        ">

          <div className="
            w-12
            h-12

            rounded-2xl

            bg-cyan-400/10

            flex
            items-center
            justify-center
          ">

            <Activity
              size={22}
              className="
                text-cyan-500
                dark:text-cyan-300
              "
            />

          </div>

          <div>

            <div className="
              text-slate-500
              dark:text-slate-400

              text-sm
            ">
              Sentiment Score
            </div>

            <div className="
              text-2xl
              font-semibold

              text-slate-900
              dark:text-white
            ">
              {company.score}
            </div>

          </div>

        </div>

        <div className="
          text-sm

          text-slate-500
          dark:text-slate-400

          leading-relaxed
        ">
          Higher magnitude indicates stronger market sentiment.
        </div>

      </div>

      {/* Headlines Count */}

      <div className="
        rounded-3xl

        border
        border-slate-200
        dark:border-white/10

        bg-slate-50
        dark:bg-white/[0.04]

        backdrop-blur-xl

        shadow-sm
        dark:shadow-none

        px-5
        py-5
      ">

        <div className="
          flex
          items-center
          gap-3

          mb-4
        ">

          <div className="
            w-12
            h-12

            rounded-2xl

            bg-blue-400/10

            flex
            items-center
            justify-center
          ">

            <Newspaper
              size={22}
              className="
                text-blue-500
                dark:text-blue-300
              "
            />

          </div>

          <div>

            <div className="
              text-slate-500
              dark:text-slate-400

              text-sm
            ">
              News Coverage
            </div>

            <div className="
              text-2xl
              font-semibold

              text-slate-900
              dark:text-white
            ">
              {company.headline_count}
            </div>

          </div>

        </div>

        <div className="
          text-sm

          text-slate-500
          dark:text-slate-400
        ">
          Headlines analyzed for this company.
        </div>

      </div>

    </div>
  )
}
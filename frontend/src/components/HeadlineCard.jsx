export default function HeadlineCard({
  headline
}) {

  function labelStyles(label) {

    if (label === "Positive") {

      return {
        border: "border-emerald-400/20",
        bg: "bg-emerald-400/10",
        text: "text-emerald-500 dark:text-emerald-300",
      }
    }

    if (label === "Negative") {

      return {
        border: "border-red-400/20",
        bg: "bg-red-400/10",
        text: "text-red-500 dark:text-red-300",
      }
    }

    return {
      border: "border-cyan-400/20",
      bg: "bg-cyan-400/10",
      text: "text-cyan-500 dark:text-cyan-300",
    }
  }

  const styles = labelStyles(
    headline.label
  )

  return (
    <a
      href={headline.link}
      target="_blank"
      rel="noreferrer"
      className={`
        block

        rounded-3xl

        bg-white
        dark:bg-white/[0.03]

        border
        border-slate-200
        dark:border-white/8

        p-6

        transition-all
        duration-300

        hover:bg-slate-50
        dark:hover:bg-white/[0.05]

        hover:scale-[1.01]

        backdrop-blur-xl

        shadow-sm
        dark:shadow-none
      `}
    >

      <div className="
        flex
        items-center
        justify-between

        mb-5
      ">

        <div className={`
          text-xs
          font-semibold

          px-3
          py-1.5

          rounded-full

          border

          ${styles.border}
          ${styles.bg}
          ${styles.text}
        `}>
          {headline.label}
        </div>

        <div className="
          text-sm
          text-slate-500
          dark:text-slate-400
        ">
          {headline.source}
        </div>

      </div>

      <div className="
        text-lg
        font-semibold

        leading-8

        text-slate-900
        dark:text-white
      ">
        {headline.title}
      </div>

      <div className="
        mt-5

        text-sm

        text-slate-500
        dark:text-slate-500
      ">
        Sentiment Score: {headline.score}
      </div>

    </a>
  )
}
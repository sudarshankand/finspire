import { motion } from "framer-motion"
import { useState } from "react"

import {
  ChevronDown,
  ChevronUp,
  Newspaper
} from "lucide-react"

import HeadlineCard from "./HeadlineCard"
import SentimentAnalytics from "./SentimentAnalytics"

export default function SentimentResults({
  results
}) {

  const [expandedCompanies, setExpandedCompanies] = useState({})

  const [showAllHeadlines, setShowAllHeadlines] = useState({})

  if (!results.length) return null

  function toggleExpanded(symbol) {

    setExpandedCompanies((prev) => ({
      ...prev,
      [symbol]: !prev[symbol]
    }))
  }

  function toggleAll(symbol) {

    setShowAllHeadlines((prev) => ({
      ...prev,
      [symbol]: !prev[symbol]
    }))
  }

  return (
    <section className="
      mt-24
      pb-24
    ">

      <div className="
        text-center

        text-4xl
        md:text-5xl

        font-bold

        text-slate-900
        dark:text-white

        mb-14
      ">

        Market Sentiment

      </div>

      <div className="
        flex
        flex-col
        gap-10
      ">

        {
          results.map((company) => {

            const expanded =
              expandedCompanies[company.symbol]

            const showAll =
              showAllHeadlines[company.symbol]

            const visibleHeadlines = showAll
              ? company.headlines
              : company.headlines.slice(0, 10)

            return (

              <motion.div
                key={company.symbol}

                initial={{
                  opacity: 0,
                  y: 40
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  duration: 0.35
                }}

                className="
                  bg-white/80
                  dark:bg-white/[0.03]

                  border
                  border-slate-200
                  dark:border-white/10

                  backdrop-blur-xl

                  rounded-[32px]

                  p-8

                  shadow-[0_10px_40px_rgba(15,23,42,0.06)]
                  dark:shadow-2xl
                "
              >

                {/* Header */}

                <div className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between

                  gap-8

                  mb-10
                ">

                  <div>

                    <div className="
                      text-4xl
                      font-bold

                      text-slate-900
                      dark:text-white
                    ">
                      {company.name}
                    </div>

                    <div className="
                      text-slate-500
                      dark:text-slate-400

                      text-lg

                      mt-2
                    ">
                      {company.symbol}
                    </div>

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-5
                  ">

                    <div className={`
                      px-5
                      py-3

                      rounded-full

                      text-lg
                      font-semibold

                      border

                      ${
                        company.label === "Positive"

                        ? `
                          bg-emerald-400/10
                          border-emerald-400/20
                          text-emerald-500
                          dark:text-emerald-300
                        `

                        : company.label === "Negative"

                        ? `
                          bg-red-400/10
                          border-red-400/20
                          text-red-500
                          dark:text-red-300
                        `

                        : `
                          bg-cyan-400/10
                          border-cyan-400/20
                          text-cyan-500
                          dark:text-cyan-300
                        `
                      }
                    `}>
                      {company.label}
                    </div>

                    <div className="
                      text-5xl
                      font-bold

                      text-slate-900
                      dark:text-white
                    ">
                      {company.score}
                    </div>

                  </div>

                </div>

                {/* Analytics */}

                <SentimentAnalytics
                  company={company}
                />

                {/* Headlines Toggle */}

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between

                  gap-4

                  mb-5
                ">

                  <div className="
                    text-slate-500
                    dark:text-slate-400

                    text-base
                  ">
                    Based on {company.headline_count} analyzed headlines.
                  </div>

                  <button
                    onClick={() => toggleExpanded(company.symbol)}
                    className="
                      flex
                      items-center
                      gap-2

                      px-5
                      py-3

                      rounded-full

                      bg-slate-100
                      dark:bg-white/[0.04]

                      hover:bg-slate-200
                      dark:hover:bg-white/[0.08]

                      border
                      border-slate-200
                      dark:border-white/10

                      text-slate-700
                      dark:text-white

                      text-sm
                      font-medium

                      transition-all
                      duration-300
                    "
                  >

                    <Newspaper size={16} />

                    {
                      expanded
                        ? "Hide Headlines"
                        : "View Headlines"
                    }

                    {
                      expanded

                      ? <ChevronUp size={16} />

                      : <ChevronDown size={16} />
                    }

                  </button>

                </div>

                {/* Headlines */}

                {
                  expanded && (

                    <>

                      <div className="
                        grid
                        grid-cols-1
                        xl:grid-cols-2

                        gap-5
                      ">

                        {
                          visibleHeadlines.map(
                            (headline, index) => (

                              <HeadlineCard
                                key={index}
                                headline={headline}
                              />
                            )
                          )
                        }

                      </div>

                      {
                        company.headlines.length > 10 && (

                          <div className="
                            flex
                            justify-center

                            mt-8
                          ">

                            <button
                              onClick={() => toggleAll(company.symbol)}
                              className="
                                px-6
                                py-3

                                rounded-full

                                bg-cyan-400/10
                                hover:bg-cyan-400/20

                                border
                                border-cyan-400/20

                                text-cyan-600
                                dark:text-cyan-300

                                font-medium

                                transition-all
                                duration-300
                              "
                            >

                              {
                                showAll
                                  ? "Show Less"
                                  : `Show All Headlines (${company.headlines.length})`
                              }

                            </button>

                          </div>
                        )
                      }

                    </>

                  )
                }

              </motion.div>
            )
          })
        }

      </div>

    </section>
  )
}
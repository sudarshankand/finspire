import { BrainCircuit, ChartNoAxesCombined } from "lucide-react"
import { useState } from "react"

import axios from "axios"

import SearchBox from "./SearchBox"
import SelectedCompanies from "./SelectedCompanies"
import SentimentResults from "./SentimentResults"
import LoadingResults from "./LoadingResults"
import Watchlist from "./Watchlist"

import { useAuth } from "../context/AuthContext"
import { saveAnalysis } from "../services/firestore"

export default function Hero() {

  const { user } = useAuth()

  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState([])
  const [mode, setMode] = useState("regular")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  async function analyzeSentiment() {

    try {

      setLoading(true)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/analyze`,
        {
          companies: selected,
          mode: mode
        }
      )

      setResults(response.data)

      // Persist each result to Firestore for history tracking (fire-and-forget)
      if (user) {
        response.data.forEach((result) => {
          saveAnalysis(user.uid, result, mode).catch(() => {})
        })
      }

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)
    }
  }

  function addFromWatchlist(company) {
    if (!selected.find((c) => c.symbol === company.symbol)) {
      setSelected((prev) => [...prev, company])
    }
  }

  return (
    <section className="
      relative
      overflow-hidden
      min-h-screen

      px-6
      pt-16
      pb-24
    ">

      {/* Background Glow */}

      <div className="
        absolute
        top-[-200px]
        left-1/2
        -translate-x-1/2

        w-[900px]
        h-[900px]

        rounded-full

        bg-cyan-400/10
        dark:bg-blue-500/10

        blur-3xl
        pointer-events-none
      " />

      {/* Content */}

      <div className="
        relative
        z-10

        max-w-5xl
        mx-auto

        flex
        flex-col
        items-center
      ">

        {/* Logo */}

        <div className="
          flex
          items-center
          gap-4

          mb-4
        ">

          <div className="
            w-18
            h-18

            rounded-3xl

            bg-cyan-500/10
            dark:bg-blue-500/10

            border
            border-cyan-400/20
            dark:border-blue-400/20

            flex
            items-center
            justify-center
          ">

            <ChartNoAxesCombined
              size={40}
              className="
                text-cyan-500
                dark:text-cyan-400
              "
            />

          </div>

          <div className="
            text-6xl
            md:text-7xl

            font-black
            tracking-tight
            leading-none
          ">

            <span className="
              text-blue-500
              dark:text-blue-400
            ">
              fin
            </span>

            <span className="
              text-slate-900
              dark:text-white
            ">
              spire
            </span>

          </div>

        </div>

        {/* Subtitle */}

        <div className="
          text-slate-500
          dark:text-blue-200/70

          text-lg
          font-medium

          tracking-wide
          uppercase

          mb-4
        ">
          AI Market Intelligence
        </div>

        {/* Main Heading */}

        <h1 className="
          text-center

          text-4xl
          md:text-6xl

          leading-tight
          font-bold

          text-slate-900
          dark:text-white

          max-w-4xl

          mb-8
        ">

          Market Insights,
          <br />

          <span className="
            text-cyan-500
            dark:text-cyan-400
          ">
            Smarter
          </span>

          {" "}Decisions.

        </h1>

        {/* Description */}

        <p className="
          text-center

          text-slate-600
          dark:text-slate-300

          text-lg
          md:text-xl

          leading-relaxed

          max-w-5xl

          mb-8
        ">
          Stay ahead with real-time market sentiment and actionable insights on Indian stocks.
        </p>

        {/* Search Section */}

        <div className="
          w-full
          max-w-4xl
        ">

          <div className="
            text-center

            text-2xl
            font-semibold

            text-slate-800
            dark:text-white

            mb-3
          ">
            Search Indian Stocks
          </div>

          <div className="
            flex
            flex-col
            md:flex-row

            gap-4
            items-stretch
          ">

            <div className="flex-1">

              <SearchBox
                query={query}
                setQuery={setQuery}
                selected={selected}
                setSelected={setSelected}
              />

            </div>

            <div className="
              isolate

              flex
              items-center

              bg-slate-100
              dark:bg-white/[0.05]

              border
              border-slate-200
              dark:border-white/10

              rounded-full

              px-2
              py-1.5

              backdrop-blur-xl

              shrink-0
            ">

              {
                [
                  "fast",
                  "regular",
                  "deep"
                ].map((item) => (

                  <button
                    key={item}
                    onClick={() => setMode(item)}
                    className={`
                      px-5
                      py-2.5

                      rounded-full

                      text-sm
                      font-medium

                      outline-none
                      focus:outline-none

                      transition-all
                      duration-300

                      capitalize

                      ${
                        mode === item

                        ? `
                          bg-cyan-400
                          text-black
                          shadow-[0_10px_30px_rgba(34,211,238,0.18)]
                        `

                        : `
                          text-slate-500
                          dark:text-slate-300

                          hover:text-cyan-500
                          dark:hover:text-cyan-200

                          hover:bg-slate-200
                          dark:hover:bg-white/[0.03]
                        `
                      }
                    `}
                  >

                    {item}

                  </button>
                ))
              }

            </div>

          </div>

          <SelectedCompanies
            selected={selected}
            setSelected={setSelected}
          />

          <Watchlist onSelect={addFromWatchlist} />

          {
            selected.length > 0 && (

              <div className="
                flex
                justify-center
              ">

                <button
                  onClick={analyzeSentiment}
                  disabled={loading}
                  className="
                    mt-10

                    flex
                    items-center
                    gap-1

                    px-6
                    py-3.5

                    rounded-full

                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-400

                    hover:from-blue-400
                    hover:to-cyan-300

                    text-white

                    font-semibold
                    text-lg

                    shadow-[0_0_30px_rgba(34,211,238,0.25)]

                    transition-all
                    duration-300

                    hover:scale-[1.03]

                    disabled:opacity-50
                    disabled:hover:scale-100
                  "
                >

                  <div className="
                    w-9
                    h-9

                    rounded-full

                    flex
                    items-center
                    justify-center
                  ">

                    <BrainCircuit
                      size={24}
                      className="
                        text-white
                      "
                    />

                  </div>

                  <span>

                    {
                      loading
                        ? "Analyzing..."
                        : "Analyze Sentiment"
                    }

                  </span>

                </button>

              </div>
            )
          }

        </div>

        {
          loading
            ? <LoadingResults />
            : <SentimentResults results={results} />
        }

      </div>

    </section>
  )
}
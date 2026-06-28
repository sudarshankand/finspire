import { Search } from "lucide-react"
import { useEffect, useState } from "react"

import axios from "axios"

export default function SearchBox({
  query,
  setQuery,
  selected,
  setSelected,
}) {

  const [results, setResults] = useState([])

  useEffect(() => {

    async function fetchCompanies() {

      if (!query.trim()) {

        setResults([])
        return
      }

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/companies`,
          {
            params: {
              q: query
            }
          }
        )

        setResults(response.data)

      } catch (err) {

        console.error(err)
      }
    }

    const timeout = setTimeout(() => {

      fetchCompanies()

    }, 250)

    return () => clearTimeout(timeout)

  }, [query])

  function addCompany(company) {

    const exists = selected.find(
      (c) => c.symbol === company.symbol
    )

    if (exists) return

    setSelected([...selected, company])

    setQuery("")
    setResults([])
  }

  return (
    <div className="relative">

      <div className="
        flex
        items-center
        gap-2

        bg-slate-100
        dark:bg-white/5

        backdrop-blur-xl

        border
        border-slate-200
        dark:border-white/10

        rounded-full

        px-7
        py-3

        shadow-[0_0_30px_rgba(0,0,0,0.08)]
        dark:shadow-[0_0_30px_rgba(0,0,0,0.15)]

        transition-colors
      ">

        <Search
          size={22}
          className="
            text-slate-500
            dark:text-[#7C8DB5]
          "
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search TCS, Infosys, Reliance..."
          className="
            bg-transparent
            outline-none

            text-slate-900
            dark:text-white

            w-full
            text-lg

            placeholder:text-slate-400
            dark:placeholder:text-[#5E6B8A]
          "
        />

      </div>

      {
        results.length > 0 && (

          <div
            className="
              absolute
              top-full
              left-0
              right-0
              mt-3

              bg-white
              dark:bg-[#0E1830]

              border
              border-slate-200
              dark:border-[#1A2A4A]

              rounded-3xl
              overflow-hidden

              shadow-2xl

              z-50
            "
          >

            <div
              className="
                max-h-[420px]

                overflow-y-auto
                overflow-x-hidden
              "

              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#243556 transparent"
              }}
            >

              {
                results.map((company) => (

                  <button
                    key={company.symbol}
                    onClick={() => addCompany(company)}
                    className="
                      w-full
                      text-left

                      px-5
                      py-3

                      hover:bg-slate-100
                      dark:hover:bg-[#162544]

                      transition

                      border-b
                      border-slate-200
                      dark:border-[#162544]

                      last:border-none
                    "
                  >

                    <div className="
                      flex
                      items-center
                      justify-between
                      gap-6
                    ">

                      <div className="
                        text-slate-900
                        dark:text-white

                        truncate
                      ">
                        {company.name}
                      </div>

                      <div className="
                        text-slate-500
                        dark:text-[#7C8DB5]

                        text-sm
                        font-medium

                        shrink-0
                      ">
                        {company.symbol}
                      </div>

                    </div>

                  </button>
                ))
              }

            </div>

          </div>
        )
      }

    </div>
  )
}
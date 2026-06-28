import { useState, useEffect } from "react"
import { X, Star } from "lucide-react"

import { useAuth } from "../context/AuthContext"
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../services/firestore"

export default function SelectedCompanies({
  selected,
  setSelected,
}) {

  const { user } = useAuth()
  const [watchedSymbols, setWatchedSymbols] = useState(new Set())

  // Load existing watchlist on user change
  useEffect(() => {
    if (!user) { setWatchedSymbols(new Set()); return }
    getWatchlist(user.uid).then((stocks) => {
      setWatchedSymbols(new Set(stocks.map((s) => s.symbol)))
    })
  }, [user])

  function removeCompany(symbol) {
    setSelected(selected.filter((c) => c.symbol !== symbol))
  }

  async function toggleWatchlist(company) {
    if (!user) return
    if (watchedSymbols.has(company.symbol)) {
      await removeFromWatchlist(user.uid, company.symbol)
      setWatchedSymbols((prev) => {
        const next = new Set(prev)
        next.delete(company.symbol)
        return next
      })
    } else {
      await addToWatchlist(user.uid, company)
      setWatchedSymbols((prev) => new Set(prev).add(company.symbol))
    }
  }

  if (selected.length === 0) return null

  return (
    <div className="
      flex
      flex-wrap
      gap-3
      mt-5
    ">

      {
        selected.map((company) => {

          const starred = watchedSymbols.has(company.symbol)

          return (

            <div
              key={company.symbol}
              className="
                flex
                items-center
                gap-3

                bg-white
                dark:bg-white/[0.05]

                border
                border-slate-200
                dark:border-white/10

                backdrop-blur-xl

                px-5
                py-2.5

                rounded-full

                shadow-md
                dark:shadow-lg
              "
            >

              <div className="
                text-slate-900
                dark:text-white
                font-medium
              ">
                {company.name}
              </div>

              {/* Star — only shown when signed in */}

              {
                user && (

                  <button
                    onClick={() => toggleWatchlist(company)}
                    title={starred ? "Remove from watchlist" : "Add to watchlist"}
                    className="transition"
                  >
                    <Star
                      size={15}
                      className={
                        starred
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-slate-400 hover:text-yellow-400"
                      }
                    />
                  </button>
                )
              }

              <button
                onClick={() => removeCompany(company.symbol)}
                className="
                  text-slate-400
                  hover:text-slate-700
                  dark:hover:text-white
                  transition
                "
              >
                <X size={16} />
              </button>

            </div>
          )
        })
      }

    </div>
  )
}

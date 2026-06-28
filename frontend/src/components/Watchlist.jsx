import { useEffect, useState } from "react"
import { Star, ChevronRight } from "lucide-react"

import { useAuth } from "../context/AuthContext"
import { getWatchlist, removeFromWatchlist } from "../services/firestore"

export default function Watchlist({ onSelect }) {

  const { user } = useAuth()
  const [stocks, setStocks] = useState([])
  const [open, setOpen]     = useState(false)

  useEffect(() => {
    if (!user) { setStocks([]); return }
    getWatchlist(user.uid).then(setStocks)
  }, [user])

  if (!user || stocks.length === 0) return null

  async function handleRemove(symbol) {
    await removeFromWatchlist(user.uid, symbol)
    setStocks((prev) => prev.filter((s) => s.symbol !== symbol))
  }

  return (
    <div className="
      mt-8

      rounded-3xl

      border
      border-slate-200
      dark:border-white/10

      bg-slate-50
      dark:bg-white/[0.03]

      backdrop-blur-xl

      overflow-hidden
    ">

      {/* Header */}

      <button
        onClick={() => setOpen((o) => !o)}
        className="
          w-full

          flex
          items-center
          justify-between

          px-6
          py-4

          hover:bg-slate-100
          dark:hover:bg-white/[0.04]

          transition
        "
      >

        <div className="flex items-center gap-2">

          <Star size={18} className="text-yellow-400 fill-yellow-400" />

          <span className="
            font-semibold
            text-slate-800
            dark:text-white
          ">
            My Watchlist
          </span>

          <span className="
            text-sm
            text-slate-500
            dark:text-slate-400
          ">
            ({stocks.length})
          </span>

        </div>

        <ChevronRight
          size={18}
          className={`
            text-slate-400
            transition-transform
            duration-200
            ${open ? "rotate-90" : ""}
          `}
        />

      </button>

      {/* Stocks list */}

      {
        open && (

          <div className="
            border-t
            border-slate-200
            dark:border-white/10

            divide-y
            divide-slate-100
            dark:divide-white/5
          ">

            {
              stocks.map((stock) => (

                <div
                  key={stock.symbol}
                  className="
                    flex
                    items-center
                    justify-between

                    px-6
                    py-3

                    hover:bg-slate-100
                    dark:hover:bg-white/[0.04]

                    transition
                  "
                >

                  <button
                    onClick={() => onSelect(stock)}
                    className="
                      flex
                      items-center
                      gap-3

                      text-left
                      flex-1
                    "
                  >

                    <div className="
                      text-slate-900
                      dark:text-white
                      font-medium
                    ">
                      {stock.name}
                    </div>

                    <div className="
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    ">
                      {stock.symbol}
                    </div>

                  </button>

                  <button
                    onClick={() => handleRemove(stock.symbol)}
                    className="
                      text-yellow-400
                      hover:text-slate-400
                      transition
                    "
                    title="Remove from watchlist"
                  >
                    <Star size={16} className="fill-yellow-400 hover:fill-none" />
                  </button>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  )
}

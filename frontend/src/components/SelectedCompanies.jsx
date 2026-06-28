import { X } from "lucide-react"

export default function SelectedCompanies({
  selected,
  setSelected,
}) {

  function removeCompany(symbol) {

    setSelected(
      selected.filter((c) => c.symbol !== symbol)
    )
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
        selected.map((company) => (

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
        ))
      }

    </div>
  )
}
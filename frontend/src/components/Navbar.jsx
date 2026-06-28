import { Moon, Sun } from "lucide-react"

export default function Navbar({
  darkMode,
  setDarkMode
}) {

  function toggleTheme() {

    if (darkMode) {

      document.documentElement.classList.remove(
        "dark"
      )

    } else {

      document.documentElement.classList.add(
        "dark"
      )
    }

    setDarkMode(!darkMode)
  }

  return (
    <nav className="
      sticky
      top-0
      z-50

      backdrop-blur-xl

      bg-white/70
      dark:bg-[#081120]/70

      border-b
      border-slate-200
      dark:border-white/5
    ">

      <div className="
        max-w-7xl
        mx-auto

        px-8
        h-15

        flex
        items-center
        justify-between
      ">

        <div className="
          flex
          items-center
          gap-4
        ">

          <div className="
            flex
            items-end
            gap-0
          ">

            <span className="
              text-3xl
              font-black
              tracking-tight

              text-blue-500
            ">
              fin
            </span>

            <span className="
              text-3xl
              font-black
              tracking-tight

              text-slate-900
              dark:text-white
            ">
              spire
            </span>

          </div>

        </div>

        <button
          onClick={toggleTheme}
          className="
            w-10
            h-10

            rounded-xl

            bg-slate-100
            dark:bg-white/5

            border
            border-slate-200
            dark:border-white/10

            flex
            items-center
            justify-center

            hover:scale-105

            transition
          "
        >

          {
            darkMode
              ? (
                <Sun
                  size={20}
                  className="
                    text-yellow-400
                  "
                />
              )
              : (
                <Moon
                  size={20}
                  className="
                    text-slate-700
                  "
                />
              )
          }

        </button>

      </div>

    </nav>
  )
}
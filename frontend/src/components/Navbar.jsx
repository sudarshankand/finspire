import { Moon, Sun, LogIn, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Navbar({
  darkMode,
  setDarkMode
}) {

  const { user, signInWithGoogle, signOutUser } = useAuth()

  function toggleTheme() {
    if (darkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
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

        {/* Logo */}

        <div className="
          flex
          items-center
          gap-4
        ">

          <div className="flex items-end gap-0">

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

        {/* Right controls */}

        <div className="flex items-center gap-3">

          {/* Auth */}

          {
            user ? (

              <div className="flex items-center gap-3">

                {/* Avatar */}

                {
                  user.photoURL ? (

                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="
                        w-8
                        h-8
                        rounded-full
                        border
                        border-white/20
                      "
                    />

                  ) : (

                    <div className="
                      w-8
                      h-8
                      rounded-full
                      bg-blue-500
                      flex
                      items-center
                      justify-center
                      text-white
                      text-sm
                      font-semibold
                    ">
                      {user.displayName?.[0] ?? "U"}
                    </div>
                  )
                }

                <button
                  onClick={signOutUser}
                  title="Sign out"
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
                  <LogOut size={18} className="text-slate-600 dark:text-slate-300" />
                </button>

              </div>

            ) : (

              <button
                onClick={signInWithGoogle}
                className="
                  flex
                  items-center
                  gap-2

                  px-4
                  py-2

                  rounded-xl

                  bg-blue-500
                  hover:bg-blue-400

                  text-white
                  text-sm
                  font-medium

                  transition
                "
              >
                <LogIn size={16} />
                Sign in
              </button>
            )
          }

          {/* Theme toggle */}

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
              darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-slate-700" />
              )
            }

          </button>

        </div>

      </div>

    </nav>
  )
}

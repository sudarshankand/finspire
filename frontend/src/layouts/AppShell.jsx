export default function AppShell({
  children
}) {

  return (
    <div className="
      min-h-screen

      bg-slate-50
      dark:bg-[#0B1020]

      text-slate-900
      dark:text-white

      transition-colors
      duration-300
    ">

      {children}

    </div>
  )
}
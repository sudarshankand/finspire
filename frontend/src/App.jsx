import { useState } from "react"

import AppShell from "./layouts/AppShell"

import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"

export default function App() {

  const [darkMode, setDarkMode] = useState(true)

  return (
    <AppShell
      darkMode={darkMode}
    >

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <HomePage />

    </AppShell>
  )
}
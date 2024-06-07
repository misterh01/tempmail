import React from "react"
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import TempMail from "./Components/TempMail"
import TopLoadingBar from "./Components/TopLoadingBar"
import { EmailProvider } from "./context"

function App() {
  return (
    <div className="dark flex flex-col h-screen">
      <Navbar />
      <TopLoadingBar />

      <div className="grow container mx-auto">
        <EmailProvider>
          <TempMail />
        </EmailProvider>
      </div>

      <Footer />
    </div>

  )
}

export default App

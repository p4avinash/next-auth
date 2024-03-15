import React from "react"
import Navbar from "@/components/Navbar"

const grouprouteLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default grouprouteLayout

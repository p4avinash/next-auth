"use client"
import Link from "next/link"
import React, { useState } from "react"
import { navLinks } from "@/utils/linksData"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await fetch("/api/users/signout")
      toast.success("Signed Out Successfully")
      router.push("/")
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <nav className='flex justify-between items-center p-2 shadow-2xl p-6'>
      <div>
        <Link href={"/"} className='text-2xl'>
          Blogs
        </Link>
      </div>
      <div className=''>
        <ul className='flex gap-8 items-center'>
          {navLinks.map(
            (link) =>
              isLoggedIn && (
                <li key={link.href}>
                  <Link className='text-2xl' href={link.href}>
                    {link.label}
                  </Link>
                </li>
              )
          )}

          <li
            onClick={handleSignOut}
            className='bg-red-600 rounded-lg py-1 px-4'
          >
            <Link href={""}>Sign Out</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

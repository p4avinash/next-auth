"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"

const ProfilePage = () => {
  const [user, setUser] = useState(null)

  const getUserData = async () => {
    const response = await axios.get("/api/users/me")
    setUser(response.data.data)
    return response.data.data
  }

  useEffect(() => {
    getUserData()
  }, [])

  if (!user) {
    return (
      <div className='mt-40 flex justify-center items-center animate-bounce'>
        <span className='loading loading-dots loading-lg'></span>
      </div>
    )
  }

  return (
    <div className='flex justify-center mt-10 p-10'>
      <div className='profile-data text-lg shadow-2xl flex flex-col gap-6 p-6'>
        <div className='flex items-center gap-4'>
          <span className=' bg-primary px-2 py-1 rounded-lg'>Name:</span>
          <p className=''>{user?.name}</p>
        </div>
        <div className='flex items-center gap-4'>
          <span className=' bg-primary px-2 py-1 rounded-lg'>Email:</span>
          <p className=''>{user?.email}</p>
        </div>
        <div
          className={`flex items-center justify-center gap-4 py-1 rounded-lg ${
            user.isVerified ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <p className=''>
            {user?.isVerified ? "Verified User" : "Not Verified User"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

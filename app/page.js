"use client"

import Link from "next/link"
import React, { useEffect } from "react"
import { loginUser } from "@/utils/action"
import { useFormState, useFormStatus } from "react-dom"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

const initialState = {
  message: null,
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button disabled={pending} className='btn btn-primary' type='submit'>
      {pending ? "Logging In..." : "Login"}
    </button>
  )
}

const LoginPage = () => {
  const [state, formAction] = useFormState(loginUser, initialState)

  useEffect(() => {
    if (state.message && state.message.toLowerCase().includes("success")) {
      toast.success(state.message)
      redirect("/dashboard")
    }

    if (state.message && state.message.toLowerCase().includes("error")) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <div className='flex justify-center mt-10 p-6 '>
      <form
        action={formAction}
        className='flex flex-col gap-4 w-full sm:w-2/4 md:w-1/3 lg:w-1/3 shadow-2xl p-8'
      >
        <input
          type='email'
          placeholder='email'
          name='email'
          className='p-2 rounded-lg'
        />
        <input
          name='password'
          type='password'
          placeholder='password'
          className='p-2 rounded-lg'
        />
        <SubmitButton />
        <p className='mt-8'>
          Not registered yet ?{" "}
          <Link href={"/sign-up"}>
            {" "}
            <span className='text-primary'>Sign Up</span>{" "}
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage

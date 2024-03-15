"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { createUser } from "@/utils/action"
import { v4 as uid } from "uuid"
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
      {pending ? "Signing Up..." : "Sign Up"}
    </button>
  )
}

const SignUpPage = () => {
  const [state, formAction] = useFormState(createUser, initialState)

  useEffect(() => {
    if (state.message && state.message.toLowerCase().includes("success")) {
      toast.success(state.message)
      redirect("/")
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
        <input type='hidden' name='userId' value={uid()} />
        <input
          type='text'
          name='full-name'
          placeholder='full name'
          className='p-2 rounded-lg'
        />
        <input
          name='email'
          type='email'
          placeholder='email'
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
          Already registered ?{" "}
          <Link href={"/"}>
            {" "}
            <span className='text-primary'>Sign In</span>{" "}
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUpPage

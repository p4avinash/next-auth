"use server"

import UserSchema from "@/models/UserSchema"
import db from "./db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { sendEmail } from "./mailer"

// create new user
export const createUser = async (prevState, formData) => {
  const userId = formData.get("userId")
  const fullName = formData.get("full-name")
  const email = formData.get("email")
  let password = formData.get("password")

  const hashedPassword = bcrypt.hashSync(password, 10)
  if (password.length > 0) {
    password = hashedPassword
  }

  const newUser = {
    userId: userId,
    name: fullName,
    email: email,
    password: password,
    isVerified: false,
    isAdmin: false,
  }

  try {
    await db.connect()
    const newUserData = new UserSchema(newUser)
    const savedUser = await newUserData.save()

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

    return { message: "Registration Successful" }
  } catch (error) {
    let errorMsg = error.message.split("dup key:")
    if (errorMsg[1]) {
      return {
        message: `Error: Email Already In Use`,
      }
    }

    if (error.message.toLowerCase().includes("validation failed")) {
      let errorMsg = `${error}`
      errorMsg = errorMsg.split(":")[errorMsg.split(":").length - 1].trim()
      return { message: `Error: ${errorMsg}` }
    }

    return { message: "Error: " + error.message }
  }
}

// login user
export const loginUser = async (prevState, formData) => {
  const email = formData.get("email")
  const password = formData.get("password")

  if (email.length === 0) {
    return { message: "Error: Please provide the email" }
  }

  if (password.length === 0) {
    return { message: "Error: Please provide the password" }
  }

  try {
    //connect to database
    await db.connect()

    //searching for the user in the database
    const user = await UserSchema.findOne({ email })

    //if user doesn't exist send error
    if (!user) {
      return {
        message: `Error: User Doesn't Exist`,
        status: 400,
      }
    }

    //match the password received in the formData with the database hashed password
    const validPassword = await bcrypt.compareSync(password, user.password)

    if (validPassword) {
      //create token data
      const tokenData = {
        id: user._id,
        email: user.email,
      }

      //create token
      const token = await jwt.sign(
        {
          data: tokenData,
        },
        process.env.NEXT_JWT_TOKEN_SECRET,
        { expiresIn: "1h" }
      )

      //set cookie
      cookies().set("token", token), { httpOnly: true }

      return { message: "Success: Login Successful" }
    } else {
      return { message: "Error: Invalid email or password" }
    }
  } catch (error) {
    return { message: "Error: Something went wrong" }
  }
}

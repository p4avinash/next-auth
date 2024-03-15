import db from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"
import UserSchema from "@/models/UserSchema"

export async function POST(request) {
  try {
    await db.connect()
    const reqBody = await request.json()
    const { token } = reqBody

    // const user = UserSchema.findOne({
    //   verifyToken: token,
    //   verifyTokenExpiry: { $gt: Date.now() },
    // })

    const user = UserSchema.findOne({
      verifyToken: token,
    })

    console.log("userId", user)

    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 400 })
    }

    // user.isVerified = true
    // user.verifyToken = undefined
    // user.verifyTokenExpiry = undefined

    // await UserSchema.findByIdAndUpdate(user._id, {
    //   isVerified: true,
    //   verifyToken: undefined,
    //   verifyTokenExpiry: undefined,
    // })

    // await user.save()

    await UserSchema.findOneAndUpdate(
      { verifyToken: token },
      {
        isVerified: true,
        verifyToken: undefined,
        verifyTokenExpiry: undefined,
      }
    )

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { getDataFromToken } from "@/utils/getDataFromToken"
import { NextRequest, NextResponse } from "next/server"
import UserSchema from "@/models/UserSchema"
import db from "@/utils/db"

export async function GET(request) {
  try {
    await db.connect()
    const userId = await getDataFromToken(request)
    const user = await UserSchema.findById({ _id: userId })

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    }

    return NextResponse.json(
      { data: userData, message: "user found" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

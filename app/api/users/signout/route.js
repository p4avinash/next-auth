import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Successfully Signed Out",
      success: true,
    })

    response.cookies.set("token", "", { httpOnly: true })
    return response
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

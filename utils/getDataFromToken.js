import jwt from "jsonwebtoken"

export const getDataFromToken = (request) => {
  try {
    const token = request.cookies.get("token")?.value || ""
    const decodedToken = jwt.verify(token, process.env.NEXT_JWT_TOKEN_SECRET)
    // console.log("decodedToken", decodedToken.data.id)
    return decodedToken.data.id
  } catch (error) {
    throw new Error(error.message)
  }
}

import nodemailer from "nodemailer"
import UserSchema from "@/models/UserSchema"
import bcryptjs from "bcrypt"
import db from "./db"

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    db.connect()
    //generate hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await UserSchema.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType === "RESET") {
      await UserSchema.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "60762bb8350929",
        pass: process.env.NEXT_MAILTRAP_PASSWORD,
      },
    })

    let verifyHTML = `<p>Click <a href="${process.env.NEXT_DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser. </br> ${process.env.NEXT_DOMAIN}/verifyemail?token=${hashedToken} </p>`
    let resetHTML = `<p>Click <a href="${process.env.NEXT_DOMAIN}/resetemail?token=${hashedToken}">here</a> to reset your email </p>`

    const mailOptions = {
      from: "avinash@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "Verify you email" : "Reset password",
      email:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY" ? verifyHTML : resetHTML,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error) {
    throw new Error(error.message)
  }
}

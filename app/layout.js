import { Inter } from "next/font/google"
import "./globals.css"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Blogs",
  description: "App where you can write your blogs",
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} `}>
        <div className=''>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}

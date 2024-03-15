import { IoHomeOutline } from "react-icons/io5"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { TfiWrite } from "react-icons/tfi"
import { CgProfile } from "react-icons/cg"

export const navLinks = [
  { href: "/", label: <IoHomeOutline /> },
  { href: "/about", label: <IoIosInformationCircleOutline /> },
  { href: "/profile", label: <CgProfile /> },
  { href: "/create-blog", label: <TfiWrite /> },
]

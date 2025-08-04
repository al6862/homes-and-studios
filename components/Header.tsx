import { HeaderQueryResult } from "@/sanity.types"
import { LinkValue } from "sanity-plugin-link-field/helpers"
import { Link } from "./Link"

export default function Header({ header } : { header : NonNullable<HeaderQueryResult> }) {
  const { navList } = header
  return (
    <header>
      {navList && navList.map((link: LinkValue) => <Link link={link} />)}
    </header>
  )
}
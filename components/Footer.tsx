import { FooterQueryResult } from "@/sanity.types"
import { LinkValue } from "sanity-plugin-link-field"
import { Link } from "./Link"

export default function Footer({ footer } : { footer : NonNullable<FooterQueryResult> }) {
  const { navList } = footer
  return (
    <footer className="footer px-5 py-5">
      <div className="flex justify-between">
        <div className="text-grey space-x-8">
          {navList && navList.map((link: LinkValue, i: number) => <Link key={i} link={link}>{link.text}</Link>)}          
        </div>
        <div>
          <span className="copyright mr-[0.125rem] text-white">©</span>
          <span className="text-grey">homesandstudio</span>
        </div>
      </div>
    </footer>
  )
}
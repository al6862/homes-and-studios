"use client"

import { HeaderQueryResult } from "@/sanity.types"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"
import { LinkValue } from "sanity-plugin-link-field"
import { Link } from "./Link"
import Logo from "./Logo"

export default function Header({ header } : { header : NonNullable<HeaderQueryResult> }) {
  const { navList } = header
  const { scrollY } = useScroll()
  const [minimizeHeader, setMinimizeHeader] = useState(false);
  const variants = {
    minimize: {
      width: "170px",
      position: 'sticky',
    },
    maximize: {
      width: "100%"
    }
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 5) {
      setMinimizeHeader(true)
    } else {
      setMinimizeHeader(false)
    }
  })
  return (
    <>
      <motion.div 
        className="max-md:hidden top-0 px-[0.3125rem] py-2 mx-auto"
        initial="maximize"
        variants={variants}
        animate={minimizeHeader ? "minimize" : "maximize"}
      >
        <Logo />
      </motion.div>
      <header className="sticky top-0 px-5 py-3">
        <div className="max-md:hidden flex justify-between">
          <div className="flex gap-8">
            {navList && navList.map((link: LinkValue, i: number) => <Link key={i} link={link} className="nav">{link.text}</Link>)}          
          </div>
          <div>
            <span className="nav">View A B C</span>
          </div>
        </div>
      </header>
    </>
  )
}
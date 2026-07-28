"use client";

import { HeaderQueryResult } from "@/sanity.types";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import NextLink from "next/link";
import { useState } from "react";
import { LinkValue } from "sanity-plugin-link-field";
import { Link } from "./Link";
import Logo from "./Logo";
import { useView } from "./view-context";

export default function Header({
  header,
}: {
  header: NonNullable<HeaderQueryResult>;
}) {
  const { navList } = header;
  const { scrollY } = useScroll();
  const [minimizeHeader, setMinimizeHeader] = useState(false);
  const { view, setView } = useView();
  const variants = {
    minimize: {
      width: "220px",
      position: "sticky",
    },
    maximize: {
      width: "100%",
    },
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 10) {
      setMinimizeHeader(true);
    } else {
      setMinimizeHeader(false);
    }
  });
  return (
    <>
      <motion.div
        className="top-3 px-[1.5625rem] mt-5 mx-auto"
        initial="maximize"
        variants={variants}
        animate={minimizeHeader ? "minimize" : "maximize"}
      >
        <NextLink href="/">
          <Logo />
        </NextLink>
      </motion.div>
      <header className="nav sticky top-0 px-5 py-3">
        <div className="flex justify-between">
          <nav className="max-md:hidden space-x-8">
            <NextLink href="/shop">Shop</NextLink>
            {navList &&
              navList.map((link: LinkValue, i: number) => (
                <Link key={i} link={link}>
                  {link.text}
                </Link>
              ))}
          </nav>

          {/* <div>
            <span className="max-md:hidden">View A B C</span>
            <span className="md:hidden">Change View</span>
          </div> */}
          <div className="flex gap-2">
            <div className="">View</div>
            <span
              onClick={() => setView("A")}
              className="alphabet-break cursor-pointer"
            >
              <span style={{ opacity: view === "A" ? 1 : 0 }}>( </span>
              <span style={{ fontWeight: view === "A" ? 400 : 275 }}>A</span>
              <span style={{ opacity: view === "A" ? 1 : 0 }}> )</span>
            </span>
            <span
              onClick={() => setView("B")}
              className="alphabet-break cursor-pointer"
            >
              <span style={{ opacity: view === "B" ? 1 : 0 }}>( </span>
              <span style={{ fontWeight: view === "B" ? 400 : 275 }}>B</span>
              <span style={{ opacity: view === "B" ? 1 : 0 }}> )</span>
            </span>
            <span className="alphabet-break text-gray">
              <span style={{ opacity: 0 }}>( </span>
              <span style={{ fontWeight: 275 }}>C</span>
              <span style={{ opacity: 0 }}> )</span>
            </span>
          </div>
        </div>
      </header>
    </>
  );
}

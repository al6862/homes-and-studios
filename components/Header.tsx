"use client";

import { HeaderQueryResult } from "@/sanity.types";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import NextLink from "next/link";
import { useState } from "react";
import { LinkValue } from "sanity-plugin-link-field";
import { Link } from "./Link";
import Logo from "./Logo";
import { useView, View } from "./view-context";

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

  const cycleView = () => {
    const nextViewMap: Record<View, View> = { A: "B", B: "C", C: "A" };
    setView(nextViewMap[view]);
  };

  return (
    <>
      <motion.div
        className="max-md:hidden top-3 px-[1.5625rem] mt-5 mx-auto"
        initial="maximize"
        variants={variants}
        animate={minimizeHeader ? "minimize" : "maximize"}
      >
        <NextLink href="/">
          <Logo />
        </NextLink>
      </motion.div>
      <header className="nav sticky top-0 px-5 py-3">
        <div className="max-md:hidden flex justify-between">
          <nav className="space-x-8">
            <NextLink href="/shop">Shop</NextLink>
            {navList &&
              navList.map((link: LinkValue, i: number) => (
                <Link key={i} link={link}>
                  {link.text}
                </Link>
              ))}
          </nav>
          <div className="flex gap-2">
            <div className="mr-[3px]">View</div>
            <span
              onClick={() => setView("A")}
              className="alphabet-break cursor-pointer"
            >
              <span style={{ opacity: view === "A" ? 1 : 0 }}>(</span>
              <span style={{ fontWeight: view === "A" ? 400 : 275 }}>A</span>
              <span style={{ opacity: view === "A" ? 1 : 0 }}>)</span>
            </span>
            <span
              onClick={() => setView("B")}
              className="alphabet-break cursor-pointer"
            >
              <span style={{ opacity: view === "B" ? 1 : 0 }}>(</span>
              <span style={{ fontWeight: view === "B" ? 400 : 275 }}>B</span>
              <span style={{ opacity: view === "B" ? 1 : 0 }}>)</span>
            </span>
            <span className="alphabet-break text-gray">
              <span style={{ opacity: view === "C" ? 1 : 0 }}>(</span>
              <span style={{ fontWeight: view === "C" ? 400 : 275 }}>C</span>
              <span style={{ opacity: view === "C" ? 1 : 0 }}>)</span>
            </span>
          </div>
        </div>
        <div className="md:hidden grid grid-cols-[1fr_auto_1fr] items-center">
          <div>Menu</div>
          <NextLink href="/" className="justify-self-center">
            <Logo />
          </NextLink>
          <div className="justify-self-end cursor-pointer" onClick={cycleView}>
            Change View
          </div>
        </div>
      </header>
    </>
  );
}

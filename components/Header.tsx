"use client";

import { HeaderQueryResult } from "@/sanity.types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const { view, setView, viewsActive, activeProject, setReturnTo } = useView();
  const isViewC = view === "C" && viewsActive;
  const variants = {
    minimize: {
      width: "220px",
      position: "sticky",
    },
    maximize: {
      width: "100%",
      position: "static",
    },
  };

  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 10) {
      setMinimizeHeader(true);
    } else {
      setMinimizeHeader(false);
    }
  });

  const router = useRouter();

  const selectView = (next: View) => {
    setView(next);
    setReturnTo(null);
    if (viewsActive) return;
    const fromLocationProject =
      activeProject && pathname.startsWith("/location/");
    router.push(fromLocationProject ? `/${activeProject.slug}` : "/");
  };

  const cycleView = () => {
    if (!viewsActive) {
      selectView("A");
      return;
    }
    const nextViewMap: Record<View, View> = { A: "B", B: "C", C: "A" };
    selectView(nextViewMap[view]);
  };

  return (
    <>
      <motion.div
        className={`max-md:hidden px-[1.5625rem] mt-5 mx-auto ${
          isViewC
            ? "fixed! inset-x-0 top-0 z-20 text-warm-white mix-blend-difference"
            : "top-3"
        }`}
        initial="maximize"
        variants={variants}
        animate={isViewC || minimizeHeader ? "minimize" : "maximize"}
      >
        <NextLink href="/">
          <Logo />
        </NextLink>
      </motion.div>
      <header
        // className={`nav px-5 py-3 ${
        className={`nav px-5 py-3 max-md:py-5 ${
          isViewC
            ? "fixed inset-x-0 top-0 z-10 max-md:text-warm-white max-md:mix-blend-difference"
            : "sticky top-0"
        }`}
      >
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
            {(["A", "B", "C"] as const).map((v) => (
              <span
                key={v}
                onClick={() => selectView(v)}
                className={`alphabet-break cursor-pointer ${view === v ? "text-gray" : ""}`}
              >
                <span style={{ opacity: view === v ? 1 : 0 }}>(</span>
                <span style={{ fontWeight: view === v ? 400 : 275 }}>{v}</span>
                <span style={{ opacity: view === v ? 1 : 0 }}>)</span>
              </span>
            ))}
          </div>
        </div>
        <div className="md:hidden relative">
          <motion.button
            initial={false}
            animate={{ opacity: introDone ? 1 : 0 }}
            onClick={() => setMenuOpen(true)}
            className={`absolute left-0 top-0 cursor-pointer ${introDone ? "" : "pointer-events-none"}`}
          >
            Menu
          </motion.button>
          <motion.div
            initial={false}
            animate={{ opacity: introDone ? 1 : 0 }}
            className={`absolute right-0 top-0 cursor-pointer whitespace-nowrap ${introDone ? "" : "pointer-events-none"}`}
            onClick={cycleView}
          >
            Change View
          </motion.div>
          <motion.div
            initial={false}
            animate={{ width: introDone ? "157px" : "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mx-auto"
          >
            <NextLink href="/" className="block">
              <Logo />
            </NextLink>
          </motion.div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              className="md:hidden fixed inset-0 z-30"
              onClick={closeMenu}
            />
            <motion.nav
              key="menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="nav md:hidden fixed inset-y-0 left-0 z-40 w-[192px] bg-background pl-[30px] pt-[60px] flex flex-col items-start gap-[74px]"
            >
              <NextLink href="/shop" onClick={closeMenu}>
                Shop
              </NextLink>
              <NextLink
                href="/location"
                onClick={closeMenu}
                className={
                  pathname.startsWith("/location")
                    ? "underline underline-offset-4"
                    : ""
                }
              >
                Location
              </NextLink>
              <NextLink
                href="/about"
                onClick={closeMenu}
                className={
                  pathname === "/about" ? "underline underline-offset-4" : ""
                }
              >
                About
              </NextLink>
              <button
                onClick={closeMenu}
                className="flex items-center gap-2 cursor-pointer"
              >
                <XMarkIcon className="h-3 w-3" />
                Close Menu
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client"

import { NavIndex, type Item } from "@/app/NavIndex"
import Link from "next/link"
import Image from "next/image"
import { useSelectedLayoutSegment } from "next/navigation"
import clsx from "clsx"
import { useState } from "react"
import { ArrowLeft, ArrowSelect, Close, Menu, PrimaeLogo } from "@/public/icons"
import { ThemeToggle } from "@/components/theme-toggle"

export function GlobalNav() {
  // const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // const [hideOnMobile, setHideOnMobile] = useState(false);
  // useEffect(() => {
  //   setHideOnMobile(isMobile);
  // }, [isMobile]);
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  // const isScreenBig = useMediaQuery({ query: "min-width: 768px" });
  // const matches = useMediaQuery("(max-width:768px)", { noSsr: true });

  const [isSidebarCollapsed, toggleSidebarCollapse] = useState(false)

  const toggleSidebarCollapseHandler = () => {
    // matches
    //   ? toggleSidebarCollapse(false)
    //   :
    toggleSidebarCollapse(!isSidebarCollapsed)
  }

  // matches ? toggleSidebarCollapse : toggleSidebarCollapse(false);

  return (
    <div className={`flex flex-row-reverse md:relative w-full md:w-auto gap-2 h-fit`}>
      <button
        className="hidden h-4 md:right-0 md:z-30 md:flex md:dark:text-pale-100 md:text-stone-700 opacity-40 hover:opacity-80"
        onClick={toggleSidebarCollapseHandler}
      >
        {" "}
        <ArrowLeft />
      </button>
      {/* </div> */}
      <div
        className={
          isSidebarCollapsed
            ? "flex flex-row md:flex-col w-full items-center justify-between border-1 rounded bg-card ease-in-out duration-500 transition-all"
            : "flex flex-row md:flex-col w-full items-center justify-between border-1 rounded h-full overflow-cli md:w-full md:items-start md:h-auto bg-card ease-in-out duration-500 transition-all"
        }
      >
        <div>
          <NavHeader isSidebarCollapsed={isSidebarCollapsed} />
        </div>
        <nav className="flex flex-col w-full ">
          {NavIndex.map((section) => {
            return (
              <div
                className={`${
                  isSidebarCollapsed ? "flex" : "hidden md:flex md:flex-auto lg:inline-flex"
                }`}
              >
                <div className="hidden w-full md:flex">
                  {" "}
                  {section.items.map((item) => (
                    <GlobalNavItem item={item} isSidebarCollapsed={isSidebarCollapsed} />
                  ))}
                </div>
              </div>
            )
          })}
        </nav>
        <div onClick={handleNav} className="px-5 cursor-pointer md:hidden">
          {menuOpen ? (
            <Close className="w-6 h-auto dark:fill-pale-100 fill-stone-700 opacity-40 hover:opacity-80" />
          ) : (
            <Menu className="w-6 h-auto dark:fill-pale-100 fill-stone-700 opacity-40 hover:opacity-80" />
          )}
        </div>
        <div
          className={
            menuOpen
              ? "fixed mt-40 right-11 ease-in-out duration-300 z-20"
              : "fixed mt-40 right-[-100%] ease-in-out duration-300 z-20"
          }
        >
          <div className="flex md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div
          className={
            menuOpen
              ? "fixed right-[88px] top-0 w-[calc(100vw-112px)] xs:w-auto my-6 h-fit md:hidden bg-card bg-opacity-95 border-1 border-sand-400 ease-in-out duration-300 z-20"
              : "fixed right-[-100%] top-0 w-[calc(100vw-112px)] xs:w-auto my-6 h-screen-1/2 md:hidden bg-sand-100 bg-opacity-95 border-1 border-sand-400 ease-in-out duration-500 z-20"
          }
        >
          <nav className="flex flex-col " onClick={() => setMenuOpen(false)}>
            {NavIndex.map((section) => {
              return (
                <div className="justify-start w-auto">
                  {" "}
                  {section.items.map((item) => (
                    <GlobalNavItem item={item} isSidebarCollapsed={false} />
                  ))}
                </div>
              )
            })}
          </nav>
        </div>
        {/* {`(max-width:768px) matches: ${matches}`} */}
      </div>
    </div>
  )
}

function GlobalNavItem({ item, isSidebarCollapsed }: { item: Item; isSidebarCollapsed: boolean }) {
  const segment = useSelectedLayoutSegment()
  const isActive = item.slug === segment
  const [isShown, setIsShown] = useState(false)

  return (
    <Link
      href={`/${item.slug}`}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={clsx(
        isActive
          ? "flex w-full px-3 py-3 bg-sand-300/90 font-semibold dark:bg-ink-800 hover:bg-sand-300/90 text-sm hover:dark:bg-ink-800 dark:!text-pale-100 !text-sand-700 items-center"
          : "flex w-full flex-row font-semibold text-sand-700 dark:text-pale-100/30 items-center px-3 py-3 text-sm hover:bg-sand-300/90 hover:dark:bg-ink-800 hover:dark:text-pale-100 hover:text-stone-700"
      )}
    >
      <div className={isSidebarCollapsed ? "pr-0" : "pr-1"}>
        <ArrowSelect className={isActive || isShown ? "block" : "hidden"} />
      </div>

      <div className={isSidebarCollapsed ? "flex items-center justify-center w-full" : "w-auto"}>
        <div className={isSidebarCollapsed ? "w-5 h-5 flex" : "w-[14px] h-[14px]"}>{item.icon}</div>
      </div>

      <div className={isSidebarCollapsed ? "hidden" : "flex pl-2"}> {item.name}</div>
    </Link>
  )
}

function NavHeader({ isSidebarCollapsed }: { isSidebarCollapsed: boolean }) {
  const segment = useSelectedLayoutSegment()
  const isActive = null === segment

  return (
    <div
      className={
        isSidebarCollapsed
          ? "w-full px-3 py-3 h-fit md:border-b-1 border-pale-400 md:py-5 md:px-5 bg-card opacity-85 font-archivo"
          : "w-full px-3 py-3 text-center md:border-b-1 border-pale-100 md:px-5 md:py-5 bg-card opacity-85 font-archivo"
      }
    >
      <Link href="/" className="flex content-center w-auto md:flex-col place-items-start">
        <div className=""></div>
        <div
          className={
            isSidebarCollapsed
              ? "flex justify-center px-2 py-2 md:p-3 border-1 rounded-lg hover:mt-1 border-stone-400 dark:border-pale-100/20 bg-card hover:-translate-y-1.5 hover:border-b-[6px] transition-all"
              : "flex md:flex-col justify-center gap-2 px-1 py-2 md:p-4 border-1 rounded-lg hover:mt-1 border-stone-400 dark:border-pale-100/20 bg-card hover:-translate-y-1.5 hover:border-b-[6px] transition-all"
          }
        >
          <div
            className={
              isActive
                ? "flex flex-col text-stone-500 dark:text-neptune-400 gap-2 justify-center flex-auto h-full transition-all"
                : "flex flex-col text-stone-500 dark:text-neptune-700 hover:dark:text-neptune-400 gap-2 justify-center flex-auto w-full h-full transition-all"
            }
          >
            {isSidebarCollapsed ? (
              <PrimaeLogoMinimal className="w-8 h-8" />
            ) : (
              <PrimaeLogo
                className={"self-center w-[98px] h-8 opacity-60 text-inherit md:w-[98px] md:h-11"}
              />
            )}
            <h1
              className={
                isSidebarCollapsed
                  ? "hidden"
                  : "text-lg font-extrabold leading-[1.125rem] md:text-[24px] dark:text-inherit font-stretch md:flex hidden"
              }
            >
              primæ
            </h1>
          </div>
        </div>
      </Link>
    </div>
  )
}

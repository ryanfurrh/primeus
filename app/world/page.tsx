"use client"
import { Counter } from "@/app/components/counter"
import { WorldIcon } from "@/public/icons"
import Image from "next/image"
import React from "react"

// export const metadata = {
//   title: "world",
//   description: "",
// };

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center flex-1 md:px-12 ">
        <div className="flex flex-col">
          <div className="flex justify-center h-auto gap-9 md:gap-16">
            <Image
              src="/gifs/construction-1.gif"
              alt={""}
              width={48}
              height={48}
              className="shrink-0"
            />
            <Image
              src="/gifs/construction-2.gif"
              alt={""}
              width={100}
              height={50}
              className="shrink-0"
            />
            <Image
              src="/gifs/construction-1.gif"
              alt={""}
              width={48}
              height={48}
              className="shrink-0"
            />
          </div>
          {/* <Counter /> */}
          <div className="pixelated">
            <Image
              src={"/images/scavenger.jpg"}
              alt={""}
              width={600}
              height={796}
              className="rendering-pixelated bg-cover border-1 border-sand-300 border-t-[10px] p-4 max-w-xs mt-12"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

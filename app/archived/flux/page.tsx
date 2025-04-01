import { CubeFiber } from "@/app/components/flux/CubeFiber"
import { FluxIcon } from "@/public/icons"
import Image from "next/image"

export const metadata = {
  title: "Flux",
  description: "",
}

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 rendering-pixelated">
      <div className="flex flex-col items-center md:px-12">
        <div className="items-center w-2/3">
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
          <div>
            <CubeFiber />
          </div>

          <Image
            src="/images/flux-illustration-1.svg"
            alt={""}
            width={175}
            height={250}
            className="mx-auto mt-12 border-1 border-sand-300 border-t-[10px] p-2 "
          />
        </div>
      </div>
    </div>
  )
}

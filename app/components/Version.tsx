import getConfig from "next/config"

const { version } = require("/package.json")

export default function Version() {
  return (
    <div className="flex px-2 py-4 text-xs font-mono text-center border-1 w-fit text-neptune-500 border-neptune-700/80 opacity-60 whitespace-nowrap">
      <h3 className="">version: {version}</h3>
    </div>
  )
}

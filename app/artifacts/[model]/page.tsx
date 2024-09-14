"use client"

import { useParams } from "next/navigation"
import { modelsData } from "../data/modelsData"
import ViewPort from "../components/ViewPort"
import { useEffect, useState } from "react"
import ModelSelect from "../components/ModelSelect"

export default function ModelPage() {
  const { model } = useParams()
  const [modelData, setModelData] = useState(null)

  useEffect(() => {
    console.log("Model from useParams:", model)
    const selectedModel = modelsData.find((m) => m.file === model)
    console.log("Selected model data:", selectedModel)
    setModelData(selectedModel)
  }, [model])

  if (!modelData) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex flex-col gap-4 mt-12">
      <ModelSelect />
      <div className="flex flex-row w-full h-full gap-4">
        <div className="flex w-full border max-h-[500px] border-foreground">
          <ViewPort modelId={modelData.file} />
        </div>
        <div className="flex flex-col w-1/3">
          <p className="">{modelData.date}</p>
          <h1 className="text-2xl text-orangeDark">{modelData.name}</h1>
          <p className="py-4">{modelData.description}</p>
          <div className="flex flex-col gap-2 text-redDark">
            <p>Dimensions: {modelData.dimensions}</p>
            <p>Weight: {modelData.weight}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

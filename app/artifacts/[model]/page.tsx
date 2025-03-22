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
    <div className="flex flex-col w-full gap-4 mt-4 md:mt-12">
      <ModelSelect />
      <div className="flex flex-col justify-center w-full gap-4 md:flex-row">
        <div className="flex w-full border-y md:border max-w-[500px] min-h-[700px] border-foreground">
          <ViewPort modelId={modelData.file} />
        </div>
        <div className="flex flex-col w-full px-3 md:max-w-sm">
          <p className="">{modelData.date}</p>
          <h1 className="text-2xl text-orangeDark">{modelData.name}</h1>
          <p className="py-4">{modelData.description}</p>
          <div className="flex flex-col gap-2 ">
            <p className="text-redDark">
              {modelData.weight} <span className="text-foreground">kg</span>
            </p>
            <div className="flex flex-row gap-3 text-redDark">
              {Object.entries(modelData.dimensions).map(([key, value]) => (
                <p key={key}>
                  {value} <span className="text-foreground">in.</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

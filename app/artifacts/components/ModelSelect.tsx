// app/artifacts/components/ModelSelect.tsx
"use client"

import * as Select from "@radix-ui/react-select"
import { useRouter, usePathname } from "next/navigation"
import { modelsData } from "../data/modelsData"
import { useEffect, useState } from "react"
import { ArrowY } from "@/public/icons"

export default function ModelSelect() {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedModel, setSelectedModel] = useState("")

  useEffect(() => {
    // Extract the model name from the current pathname (e.g., /artifacts/Visor)
    const currentModel = pathname.split("/").pop()
    if (modelsData.some((model) => model.file === currentModel)) {
      setSelectedModel(currentModel)
    }
  }, [pathname])

  const handleSelect = (value) => {
    setSelectedModel(value)
    router.push(`/artifacts/${value}`)
  }

  return (
    <Select.Root value={selectedModel} onValueChange={handleSelect}>
      <div className="flex flex-col items-center">
        <Select.Trigger
          aria-label="Model"
          className="flex flex-row items-center justify-between w-48 gap-4 py-2 pl-8 pr-2 border outline-none border-peach"
        >
          <Select.Value placeholder="Select a model" />
          <ArrowY />
        </Select.Trigger>
        <Select.Content className="top-0 z-50 flex border max-w-[200px] bg-background border-peach absolute">
          <Select.ScrollUpButton />
          <Select.Viewport className="flex flex-col gap-2 p-2">
            {modelsData.map((model) => (
              <Select.Item
                key={model.file}
                value={model.file}
                className="px-4 outline-none text-peach hover:bg-peach hover:text-background hover:cursor-pointer"
              >
                <Select.ItemText className="py-8">{model.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </div>
    </Select.Root>
  )
}

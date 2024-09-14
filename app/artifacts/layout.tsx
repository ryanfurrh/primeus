import ModelSelect from "./components/ModelSelect"

export default function ArtifactsLayout({ children }) {
  console.log("ArtifactsLayout rendered")
  return (
    <div className="flex flex-col w-full h-full pl-36">
      <header className="flex flex-col mt-12">
        <h1 className="font-archivo">Artifacts</h1>
        <div className="flex w-auto"></div>
      </header>

      <main className="flex w-full h-full">{children}</main>
    </div>
  )
}

import ModelSelect from "./components/ModelSelect"

export default function ArtifactsLayout({ children }) {
  console.log("ArtifactsLayout rendered")
  return (
    <div className="flex flex-col w-full h-full md:pl-36">
      <header className="flex flex-col md:mt-12">
        <div className="flex w-auto"></div>
      </header>

      <main className="flex w-full h-full">{children}</main>
    </div>
  )
}

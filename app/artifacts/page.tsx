// app/artifacts/page.tsx
import ModelSelect from "./components/ModelSelect"

const ArtifactsPage = () => {
  return (
    <div className="flex justify-center w-full ">
      <div className="flex w-full border max-h-[500px] border-foreground h-full mt-[106px] items-center justify-center mr-48">
        <ModelSelect />
      </div>
    </div>
  )
}

export default ArtifactsPage

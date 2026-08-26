export default function ArtifactsLayout({ children }) {
  return (
    <div className="flex flex-col w-full h-full">
      <main className="flex w-full h-full">{children}</main>
    </div>
  )
}

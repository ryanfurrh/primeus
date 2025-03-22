import PostPreview from "@/app/components/PostPreview"
import getPostMetadata from "@/app/components/getPostMetadata"
import { DocumentationIcon } from "@/public/icons"
import Link from "next/link"

export const metadata = {
  title: "Documentation",
  description: "",
}

const documentation = () => {
  const postMetadata = getPostMetadata()
  const postPreviews = postMetadata.map((post) => <PostPreview key={post.slug} {...post} />)

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="grid grid-cols-1 gap-4 px-4 mt-12 justify-items-center md:justify-items-center lg:grid-cols-2 md:mx-16">
        {postPreviews}
      </div>
    </div>
  )
}

export default documentation

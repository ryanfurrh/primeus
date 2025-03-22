import fs from "fs"
import Markdown from "markdown-to-jsx"
import matter from "gray-matter"
import getPostMetadata from "@/app/components/getPostMetadata"
import Link from "next/link"
import Balancer from "react-wrap-balancer"
import { ArrowLeft, DocumentationIcon } from "@/public/icons"

const getPostContent = (slug: string) => {
  const folder = "posts/"
  const file = `${folder}${slug}.md`
  const content = fs.readFileSync(file, "utf8")
  const matterResult = matter(content)
  return matterResult
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const metadata = {
  title: "Documentation",
  description: "",
}

const PostPage = (props: any) => {
  const slug = props.params.slug
  const post = getPostContent(slug)
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 font-jet text-pale-100">
      <div className="flex flex-col md:flex-row ">
        <Link href={"/documentation"} className="px-2 md:px-6">
          <ArrowLeft />
        </Link>
        <div className="w-full h-full px-4 pt-4 md:p-0">
          <div className="mb-4">
            <div className="px-2 py-1 mb-1 rounded-sm md:mb-2 w-fit bg-sand-300/50 dark:bg-ink-800">
              <h3 className="text-[10px] md:text-xs font-semibold leading-none uppercase text-sand-500 dark:text-bone-50/50">
                {post.data.subtitle}
              </h3>
            </div>
            <h1 className="text-4xl font-bold leading-none dark:text-pale-100 text-sand-600">
              <Balancer>{post.data.title}</Balancer>
            </h1>
            <div className="flex flex-row gap-4 mt-1 text-xs text-sand-400">
              <p>Entry #{post.data.entry}</p>
              <p>{post.data.date}</p>
            </div>
          </div>

          <div className="h-24 border-1 border-sand-300 w-36"></div>
          <article className="flex h-full prose-sm prose dark:text-bone-50 text-sand-900 ">
            <Markdown
              options={{
                overrides: {
                  h2: {
                    props: {
                      className: "dark:text-neptune-600",
                    },
                  },
                  strong: {
                    props: {
                      className: "dark:text-neptune-500",
                    },
                  },
                },
              }}
            >
              {post.content}
            </Markdown>
          </article>
        </div>
      </div>
    </div>
  )
}

export default PostPage

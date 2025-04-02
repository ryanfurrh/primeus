import { IconType } from "react-icons"
import {
  ArtifactDatabaseIcon,
  DocumentationIcon,
  FluxIcon,
  PrimaeLogo,
  WorldIcon,
} from "@/public/icons"

export type Item = {
  name: string
  slug: string
  description?: string
  icon: any
}

export const NavIndex: { items: Item[] }[] = [
  {
    items: [
      {
        name: "world_",
        slug: "world",
        description: "string",
        icon: <WorldIcon className="w-full h-auto" />,
      },
    ],
  },
  {
    items: [
      {
        name: "artifacts_",
        slug: "artifacts",
        description: "string",
        icon: <ArtifactDatabaseIcon className="w-full h-auto" />,
      },
    ],
  },
  {
    items: [
      {
        name: "documentation_",
        slug: "documentation",
        description: "string",
        icon: <DocumentationIcon className="w-full h-auto" />,
      },
    ],
  },
]

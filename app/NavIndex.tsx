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
        name: "World_",
        slug: "world",
        description: "string",
        icon: <WorldIcon className="w-full h-auto" />,
      },
    ],
  },
  {
    items: [
      {
        name: "Artifacts_",
        slug: "artifacts",
        description: "string",
        icon: <ArtifactDatabaseIcon className="w-full h-auto" />,
      },
    ],
  },
  {
    items: [
      {
        name: "Archive_",
        slug: "archive",
        description: "string",
        icon: <DocumentationIcon className="w-full h-auto" />,
      },
    ],
  },
]

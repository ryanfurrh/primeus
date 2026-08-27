// lib/getPagePaths.ts
import fs from "fs"
import path from "path"

export function getPagePaths(directory: string): string[] {
  const dirPath = path.join(process.cwd(), directory)
  const files = fs.readdirSync(dirPath)

  return files
    .map((file) => {
      const filePath = path.join(dirPath, file)
      const fileStat = fs.statSync(filePath)
      if (fileStat.isDirectory()) {
        return getPagePaths(path.join(directory, file))
      }
      if (fileStat.isFile() && path.extname(file) === ".tsx") {
        return path.join(directory, file).replace(/\\/g, "/") // For Windows compatibility
      }
      return null
    })
    .filter((path): path is string => path !== null)
}

export function slugify(input: string): string {
  return input
    .trim()
    .replace(/\.[^/.]+$/, "") // remove .md or any extension
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/_/g, "-") // replace underscores too
    .replace(/[^\w\-\/]+/g, "") // remove invalid chars (keep slashes for nested paths)
    .toLowerCase()
}

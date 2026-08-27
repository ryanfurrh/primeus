import getConfig from "next/config";
import Version from "./Version";

const { version } = require("/package.json");

export function Footer() {
  return (
    <footer>
      {/* No left padding any more — that was compensating for the sidebar
          when it took a real column. The rail floats now, so the footer
          spans the full width and its text centres on the viewport, in line
          with the surfaces above it. */}
      <div className="w-full py-4 mt-6 text-xs gap-2 flex flex-col font-mono italic text-center bg-transparent border-t-1 border-sand-300 dark:border-pale-100/40 z-5 text-sand-400 dark:text-pale-100/50">
        <h3 className="">[from the primordium]</h3>
        <div className="flex justify-center md:hidden">
          <Version />
        </div>
      </div>
    </footer>
  );
}

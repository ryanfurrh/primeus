import Link from "next/link";
import { PostMetadata } from "./PostMetadata";
import { NoImage } from "@/public/icons";

const PostPreview = (props: PostMetadata) => {
  return (
    <div className="flex items-center flex-none w-full gap-4 md:gap-5 border-1 border-sand-600 dark:border-pale-100/30 bg-sand-100 dark:bg-ink-900">
      <div className="flex flex-none w-16 h-full md:w-20 border-r-1 border-sand-400 dark:border-pale-100/30 place-content-center text-sand-700 dark:text-ink-50 bg-sand-300 dark:bg-ink-800">
        <NoImage className="self-center" />
      </div>
      <Link
        href={`/documentation/${props.slug}`}
        className="pr-4 my-3 truncate md:my-4 md:pr-6"
      >
        <h2 className="text-lg font-bold leading-none truncate md:text-xl text-sand-600 dark:text-ink-50 hover:underline">
          {props.title}
        </h2>
        <div className="flex flex-row gap-4 text-[10px] md:text-xs text-sand-500 dark:text-ink-50/50">
          <p>Entry #{props.entry}</p>
          <p>{props.date}</p>
        </div>
        <div className="px-2 py-1 mt-1 rounded-sm md:mt-2 w-fit bg-sand-300/50 dark:bg-ink-800">
          <h3 className="text-[10px] md:text-xs font-semibold leading-none uppercase text-sand-500 dark:text-ink-50/50">
            {props.subtitle}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default PostPreview;

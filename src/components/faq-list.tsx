import { cx } from "@/lib/format";

export function FaqList({
  items,
  className,
  defaultOpenFirst = false,
}: {
  items: { question: string; answer: string }[];
  className?: string;
  defaultOpenFirst?: boolean;
}) {
  return (
    <div className={cx("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => (
        <details
          key={item.question}
          open={defaultOpenFirst && index === 0}
          className="group"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 outline-none [&::-webkit-details-marker]:hidden">
            <span className="text-[15px] leading-7 text-ink transition-colors group-hover:text-red md:text-base">
              {item.question}
            </span>
            <span className="relative mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center text-graphite">
              <span className="absolute h-px w-4 bg-current" />
              <span className="absolute h-4 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pl-2 pr-0 text-[13px] leading-7 text-graphite md:text-sm md:leading-8">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

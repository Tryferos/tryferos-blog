import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import { cn } from "@/lib/utils";

const components: MDXComponents = {
  h2: ({ children, className, ...props }) => (
    <h2
      className={cn("mt-12 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }) => (
    <h3
      className={cn("mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ className, ...props }) => <p className={cn("my-5", className)} {...props} />,
  a: ({ href = "", children, className, ...props }) => {
    const classes = cn(
      "text-link underline decoration-link/40 underline-offset-4 transition-colors hover:decoration-link",
      className,
    );
    return href.startsWith("/") ? (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  },
  strong: ({ className, ...props }) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-5 list-disc space-y-2 pl-6 marker:text-primary", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-5 list-decimal space-y-2 pl-6 marker:text-primary", className)} {...props} />
  ),
  li: ({ className, ...props }) => <li className={cn("pl-1", className)} {...props} />,
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn("my-6 border-l-2 border-primary pl-5 text-muted-foreground italic", className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => <hr className={cn("my-12", className)} {...props} />,
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded-sm bg-code px-1.5 py-0.5 font-mono text-[0.875em] text-code-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border bg-code p-4 font-mono text-sm leading-relaxed text-code-foreground [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn("w-full text-left text-base", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th className={cn("border-b px-3 py-2 font-semibold text-foreground", className)} {...props} />
  ),
  td: ({ className, ...props }) => (
    <td className={cn("border-b px-3 py-2", className)} {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

// WHY: Scroll containers styled one by one end up with scrollbars of different colors and widths.
// SOLVES: Requires app code to scroll through the ScrollArea component instead of overflow-auto or overflow-scroll classes. components/ui keeps its own scroll containers, which take the global scrollbar style from globals.css.
import path from 'node:path';
import { defineConfig } from 'oxlint';

const scrollingPlugin = path.join(
  import.meta.dirname,
  '../plugins/scrolling.plugin.ts',
);

export default defineConfig({
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      excludeFiles: ['src/components/ui/**'],
      jsPlugins: [scrollingPlugin],
      rules: { 'scrolling/scroll-area-only': 'error' },
    },
  ],
});

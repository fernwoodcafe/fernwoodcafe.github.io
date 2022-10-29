// For different configuration during testing.
// 1. Create vitest.config.ts, which will have the higher priority
// 2. Pass --config option to CLI, e.g. vitest --config ./path/to/vitest.config.ts
// 3. Use process.env.VITEST or mode property on defineConfig...

import x from "./vite.config";

export default x;

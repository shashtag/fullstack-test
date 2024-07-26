import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules",
        "tests",
        "vite.config.ts",
        "src/index.ts",
        "src/app.ts",
        "vitest.config.ts",
        ".eslintrc.cjs",
        "vite-env.d.ts",
        "src/Routes",
        "src/config.ts",
      ],
    },
  },
});

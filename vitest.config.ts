import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  test: {
    environment: "jsdom",
    include: ["__tests__/**/*.test.{ts,tsx}"],
    setupFiles: ["./__tests__/setup.ts"],
    globals: true,
  },
});

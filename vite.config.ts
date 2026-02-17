import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  const plugins = [
    react(),
    tailwindcss(),
    vitePluginManusRuntime(),
    ...(isDev ? [jsxLocPlugin()] : []),
  ];

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    build: {
      sourcemap: "hidden",
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules/react") || id.includes("node_modules/wouter")) {
              return "react-vendor";
            }

            if (id.includes("node_modules/@radix-ui") || id.includes("node_modules/lucide-react")) {
              return "ui-vendor";
            }

            if (
              id.includes("node_modules/recharts") ||
              id.includes("node_modules/framer-motion") ||
              id.includes("node_modules/react-day-picker")
            ) {
              return "feature-vendor";
            }
          },
        },
      },
    },
  };
});

import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import babel from "vite-plugin-babel"

export default defineConfig({
  build: {
    target: "es2022"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022"
    }
  },
  plugins: [
    // Run the react-compiler on .tsx files
    babel({
      filter: /\.tsx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"],
        plugins: ["babel-plugin-react-compiler"]
      }
    }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths()
  ]
})

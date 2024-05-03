import { crx } from "@crxjs/vite-plugin";
import { resolve } from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import manifest from "./src/manifest";
import * as path from "node:path";
import tailwindcss from "tailwindcss";
import hotReloadExtension from "hot-reload-extension-vite";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

const isDev = process.env.__DEV__ === "true";

const viteManifestHackIssue846: { name: string; renderCrxManifest(_manifest, bundle): void } = {
  name: "manifestHackIssue846",
  renderCrxManifest(_manifest, bundle) {
    bundle["manifest.json"] = bundle[".vite/manifest.json"];
    bundle["manifest.json"].fileName = "manifest.json";
    delete bundle[".vite/manifest.json"];
  },
};


export default defineConfig({
  plugins: [
    solidPlugin(),
    viteManifestHackIssue846,
    crx({ manifest }),
    hotReloadExtension(
      {
        log: true,
        backgroundPath: resolve(pagesDir, "sidepanel", "index.html"),
      }
    )
  ],
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
      "tailwind.config.js": resolve(__dirname, "tailwind.config.js"),
    },
  },
  optimizeDeps: {
    include: [
      path.resolve(__dirname, "tailwind.config.js"),
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        content: resolve(pagesDir, "content", "content.tsx"),
        // background: resolve(pagesDir, "background", "index.ts"),
        // popup: resolve(pagesDir, "popup", "index.html"),
        sidepanel: resolve(pagesDir, "sidepanel", "sidepanel.html"),
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev
          ? "assets/js/[name].js"
          : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name);
          // const assetFolder = getLastElement(dir.split("/"));
          // const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${_name}.chunk.[ext]`;
        },
      },
    },
  },
});

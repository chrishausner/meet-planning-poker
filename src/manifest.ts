import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/g, "")
    // split into version parts
    .split(/[.-]/);

const manifest = defineManifest(async () => ({
    manifest_version: 3,
    name: packageJson.displayName ?? packageJson.name,
    version: `${major}.${minor}.${patch}.${label}`,
    description: packageJson.description,
    // options_page: "src/pages/options/index.html",
    background: { service_worker: "src/service-worker.ts" },
    action: {
        default_title: "Click to open panel"
        // default_popup: "src/pages/popup/index.html",
        // default_icon: "icons/34x34.png",
    },
    // chrome_url_overrides: {
    //     newtab: "src/pages/newtab/index.html",
    // },
    icons: {
        "48": "icons/icon48.png",
        "128": "icons/icon128.png",
    },
    content_scripts: [
        {
            matches: [ "*://meet.google.com/*"],
            js: ["src/pages/content/content.tsx"],
        },
    ],
    permissions: [
        "sidePanel",
        "tabs",
    ],
    // side_panel: {
    //   default_path: "src/test.html"
    // }
    // devtools_page: "src/pages/devtools/index.html",
    // web_accessible_resources: [
    //     {
    //         resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
    //         matches: ["*://*/*"],
    //     },
    // ],
}));

export default manifest;

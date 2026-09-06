import { cpSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next/standalone");

if (!existsSync(standalone)) {
  console.error('Missing .next/standalone. Run "npm run build" with output: "standalone".');
  process.exit(1);
}

const nestedCandidates = [
  join(standalone, "workspace"),
  join(standalone, "app"),
];
const src =
  nestedCandidates.find((candidate) => existsSync(join(candidate, "server.js"))) ??
  standalone;

if (!existsSync(join(src, "server.js"))) {
  console.error("Could not find standalone server.js under", standalone);
  process.exit(1);
}

const dest = join(root, "deploy");
rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
cpSync(join(root, ".next/static"), join(dest, ".next/static"), { recursive: true });
if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(dest, "public"), { recursive: true });
}

writeFileSync(
  join(dest, "START.txt"),
  [
    "Production server for Cornerstone Home Inspection",
    "",
    "Run:",
    "  HOSTNAME=0.0.0.0 PORT=43217 node server.js",
    "",
    "Optional environment variables:",
    "  OFFICE_PIN   (default: cornerstone)",
    "  RESEND_API_KEY",
    "  RESEND_FROM",
    "",
  ].join("\n"),
);

console.log(`Packed production folder: ${dest}`);
console.log("Start with: HOSTNAME=0.0.0.0 PORT=43217 node deploy/server.js");

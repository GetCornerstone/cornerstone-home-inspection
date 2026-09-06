import { existsSync } from "node:fs";

if (existsSync("src/app") || existsSync("app")) {
  process.exit(0);
}

console.error(`
Build cannot start: this copy of the project has no src/app folder.

On GitHub, open the repository and look next to package.json.
You should see a folder named src (with app inside it) and a folder named public.

If those folders are missing, upload them to the repository root — not inside
another cornerstone-home-inspection folder — then Redeploy on Vercel.
`);
process.exit(1);

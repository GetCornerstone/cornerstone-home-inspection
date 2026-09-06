# How to put the website on the internet

You do not need to upload the `deploy` folder for the easiest option. Use **Vercel**. It is free for a website this size.

Follow **Path A**. Use Path B only if Path A is not on your screen.

---

## Path A — Use the Publish button (easiest)

1. Look at this Cursor chat. Find the **Publish** button (near the top of the conversation).
2. Click **Publish**.
3. If it asks you to connect or log in to **Vercel**, do that. Use your Google or GitHub login if you have one. Create a free Vercel account if you do not.
4. If it asks you to create a GitHub repository for this project, say yes and give it a name such as `cornerstone-home-inspection`.
5. Wait. The first publish often takes 1–3 minutes. Do not close the window.
6. When it finishes, it will show a web address that ends in **vercel.app**.
7. Click that address. Your live site should open.

That address is your public website. You can put it on your business card and in email.

---

## Path B — Publish from the Vercel website

Use this if you do not see a Publish button.

### Part 1 — Put the project on GitHub

1. Create a free account at [github.com](https://github.com) if you do not have one.
2. In Cursor, create a repository for this project (the **Create repo** control, or GitHub’s **New repository** page).
3. Name it something like `cornerstone-home-inspection`.
4. Make sure the code is on GitHub. You should see files such as `package.json` and a `src` folder.

### Part 2 — Connect GitHub to Vercel

1. Go to [vercel.com/signup](https://vercel.com/signup).
2. Click **Continue with GitHub**.
3. Allow Vercel to see your GitHub account.
4. Click **Add New…** then **Project**.
5. Find `cornerstone-home-inspection` (or whatever you named it) and click **Import**.
6. Leave the settings as they are. Do not change the framework. It should say Next.js.
7. Click **Deploy**.
8. Wait 1–3 minutes.
9. Click **Visit** (or the address ending in **vercel.app**).

---

## After it is live — change your office password

The office page (`yoursite.vercel.app/office`) currently uses the PIN **cornerstone**. Change that before you share the site widely.

1. Open your project on [vercel.com/dashboard](https://vercel.com/dashboard).
2. Click **Settings**.
3. Click **Environment Variables**.
4. Add a new variable:
   - Name: `OFFICE_PIN`
   - Value: a password only you know (not the word cornerstone)
5. Save.
6. Go to **Deployments**, open the latest one, and click **Redeploy**.

Then go to `yoursite.vercel.app/office` and sign in with the new PIN.

---

## Check that it works

1. Open the live address in your phone browser and on a computer.
2. Click **Schedule** and send a test message to yourself.
3. Open `/office`, sign in, and confirm the test request is there.
4. Call the phone number on the site and make sure it is yours: (734) 338-5320.

---

## Optional: a name like cornerstonehi.com

The free Vercel address looks like `something.vercel.app`. That is fine to start.

Later you can buy a name (about $10–15 per year) from Namecheap, Porkbun, or Cloudflare, then in Vercel go to **Settings → Domains** and follow their prompts to attach it. You do not need to do this on day one.

---

## What not to do

- Do not upload this site to GitHub Pages, Wix, or a regular “file manager / public_html” host. Those cannot run the schedule form or the office page.
- Do not email the `deploy` folder to a web host unless they specifically run Node.js apps.
- Do not leave the office PIN as `cornerstone` once customers can find `/office`.

---

## If something goes wrong

- **Publish asks you to log in to Vercel again.** Log in, then click Publish once more.
- **The live page is blank or an error.** Wait two minutes and refresh. The first deploy is slow.
- **You cannot sign in to /office.** You are using the old PIN. Use `cornerstone` until you add `OFFICE_PIN` and redeploy.
- **You want help.** Send me a screenshot of the Vercel screen you are stuck on.

# Cornerstone Home Inspection LLC

Marketing website for **Cornerstone Home Inspection LLC**, a Michigan-licensed inspection company owned by certified home inspector **John Nichols** and serving Southeastern Michigan.

Branding, colors, and contact details come from John’s business card: navy, gold, and the block-house logo.

## Contact

- John Nichols, Certified Home Inspector
- (734) 338-5320
- GetCornerstoneHI@Gmail.com
- Tagline: *We Protect Your Interests*

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43217](http://localhost:43217).

## Put the website on the internet

Follow the plain-language steps in [DEPLOY.md](DEPLOY.md). The short version: click **Publish** in this chat (free on Vercel). That is easier than uploading any folder.

## Office analytics and auto-replies

Open [http://localhost:43217/office](http://localhost:43217/office) and sign in with PIN `cornerstone` (change this with `OFFICE_PIN` in `.env.local`).

The dashboard shows every recorded page view, inspection request, and the automatic reply generated for that request. Use **Export JSON** for a full dump or **Export page views CSV** for a spreadsheet.

Data is stored in `data/office.json` on this machine. On serverless hosts such as Vercel, that file may not persist across deploys — keep a local copy of exports, or add `RESEND_API_KEY` so replies are also emailed.

Optional email sending (Resend):

```bash
OFFICE_PIN=your-pin
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM="John Nichols <you@yourdomain.com>"
```

Until those keys are set, visitors still see the automatic reply on the schedule page and you can read every request in `/office`.

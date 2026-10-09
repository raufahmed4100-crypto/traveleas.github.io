# Ochni Angular Starter

Standalone Angular starter storefront for Ochni Kids Play Accessories. This is a frontend demo; checkout, authentication, database, and message delivery need a backend integration.

Build with `npm install && npm run build`.

## Deploy the website + email backend on Vercel

GitHub Pages only hosts static files and cannot run the email API. Deploy this folder as its own Vercel project:

1. Import repository `raufahmed4100-crypto/traveleas.github.io` in Vercel.
2. Set **Root Directory** to `ochni-angular`.
3. Set **Framework Preset** to **Other**.
4. Override **Build Command** and leave it empty; set **Output Directory** to `.` (a single dot).
5. In Project Settings → Environment Variables, add the variables below, then deploy.

### Email environment variables (Gmail SMTP)

Create a Google **App Password** (2-Step Verification must be enabled). Do not use your normal Gmail password.

- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `465`
- `SMTP_USER` = the Gmail address used to send messages
- `SMTP_PASS` = the Google App Password (keep secret)
- `CONTACT_EMAIL` = the inbox where you want to receive messages

After adding/changing variables, redeploy. The contact form POSTs to `/api/contact`; the API validates the fields and emails the message to `CONTACT_EMAIL`.

**Important:** Never commit email passwords or secrets to GitHub. Email works only after the API is deployed and the environment variables are configured. The current product/cart UI is a front-end demo; orders are not saved to a database yet.

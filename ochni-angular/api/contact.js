const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Use POST for contact messages." });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Please complete all fields." });
  }
  if (String(name).length > 120 || String(email).length > 254 || String(message).length > 5000) {
    return res.status(400).json({ ok: false, message: "Your message is too long." });
  }
  const safeEmail = String(email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return res.status(400).json({ ok: false, message: "Please enter a valid email address." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    return res.status(503).json({ ok: false, message: "Email service is not configured yet. Please try again later." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });
    await transporter.sendMail({
      from: { name: "Ochni Website", address: SMTP_USER },
      to: CONTACT_EMAIL,
      replyTo: { name: String(name).trim(), address: safeEmail },
      subject: "New message from the Ochni website",
      text: "Name: " + String(name).trim() + "\nEmail: " + safeEmail + "\n\nMessage:\n" + String(message).trim()
    });
    return res.status(200).json({ ok: true, message: "Message sent successfully. Thank you!" });
  } catch (error) {
    console.error("Ochni contact email failed:", error && error.message);
    return res.status(500).json({ ok: false, message: "Could not send your message right now. Please try again later." });
  }
};

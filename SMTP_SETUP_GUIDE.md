# SMTP Email Configuration Guide

## Add these variables to your .env file

```env
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

---

## Configuration for Different Email Providers

### 1. Gmail (Recommended)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Other" (name it: Mattress Website)
5. Copy the 16-character password (format: xxxx xxxx xxxx xxxx)
6. Use it as SMTP_PASS (include spaces or not, both work)

---

### 2. Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

---

### 3. Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

**Note:** Yahoo requires app password. Go to Account Security → Generate app password

---

### 4. SendGrid (Professional)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

**Get SendGrid API Key:**
1. Sign up at https://sendgrid.com
2. Go to Settings → API Keys
3. Create API Key with "Mail Send" permissions

---

### 5. Mailgun (Professional)

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-smtp-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

---

### 6. Amazon SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

---

### 7. Custom SMTP Server

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM_NAME=MattressWala
ADMIN_EMAIL=admin@yourdomain.com
CONTACT_PHONE=+91 1234567890
```

---

## Port Configuration Guide

- **Port 587**: Standard SMTP with STARTTLS (SMTP_SECURE=false) ✅ Recommended
- **Port 465**: SMTP with SSL/TLS (SMTP_SECURE=true)
- **Port 25**: Plain SMTP (not recommended, often blocked)

---

## Variable Descriptions

| Variable | Required | Description |
|----------|----------|-------------|
| `SMTP_HOST` | Yes | SMTP server hostname |
| `SMTP_PORT` | No | SMTP port (default: 587) |
| `SMTP_SECURE` | No | Use SSL/TLS (true for 465, false for 587) |
| `SMTP_USER` | Yes | Your email address / SMTP username |
| `SMTP_PASS` | Yes | Your email password / app password / API key |
| `SMTP_FROM_NAME` | No | Display name in "From" field (default: MattressWala) |
| `ADMIN_EMAIL` | No | Where to receive quote notifications (default: SMTP_USER) |
| `CONTACT_PHONE` | No | Phone number to display in emails |

---

## Testing Your Configuration

1. Add the SMTP variables to your `.env` file
2. Restart your development server
3. Go to http://localhost:3000
4. Click "Request a Quote" on any product
5. Fill out the form and submit
6. Check:
   - Customer email (should receive confirmation)
   - Admin email (should receive notification)
   - Terminal logs (shows email sent status)

---

## Troubleshooting

### Error: "Invalid login"
- Check SMTP_USER and SMTP_PASS are correct
- For Gmail, ensure you're using App Password, not regular password
- Verify 2-Step Verification is enabled

### Error: "Connection timeout"
- Check SMTP_HOST is correct
- Try different port (587 or 465)
- Check firewall/antivirus isn't blocking

### Error: "Self-signed certificate"
- Add to transporter config: `tls: { rejectUnauthorized: false }`

### Emails not arriving
- Check spam/junk folder
- Verify sender email is valid
- Some providers require email verification

---

## Security Tips

1. ✅ Never commit `.env` file to git
2. ✅ Use app-specific passwords, not account passwords
3. ✅ Keep SMTP credentials secure
4. ✅ Use environment variables for production
5. ✅ Regularly rotate passwords/API keys

---

## Production Deployment

For production (Vercel, Netlify, etc.), add these as Environment Variables in your hosting platform's dashboard, not in `.env` file.

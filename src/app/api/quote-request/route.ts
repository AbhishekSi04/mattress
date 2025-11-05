import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, cartItems, total, timestamp } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password', // Use app password for Gmail
      },
    });

    // Generate cart items HTML
    const cartItemsHtml = cartItems && cartItems.length > 0 ? cartItems.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.title}</strong><br>
          Size: 1500×1900<br>
          <span style="color: #dc2626;">15% OFF</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
          ₹${(Math.round(item.price * 0.7) * item.quantity).toLocaleString()}<br>
          <span style="color: #6b7280; text-decoration: line-through; font-size: 12px;">
            ₹${(item.price * item.quantity).toLocaleString()}
          </span>
        </td>
      </tr>
    `).join('') : '<tr><td colspan="3" style="padding: 20px; text-align: center; color: #6b7280;">General quote request - no specific items selected</td></tr>';

    // Email template for the customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Quote Request!</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 16px;">
            We'll get back to you within 24 hours with a detailed quotation.
          </p>
        </div>

        <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">Your Quote Details</h2>
          
          <div style="background: white; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 15px; text-align: left; font-weight: 600; color: #374151;">Product</th>
                  <th style="padding: 15px; text-align: center; font-weight: 600; color: #374151;">Qty</th>
                  <th style="padding: 15px; text-align: right; font-weight: 600; color: #374151;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${cartItemsHtml}
              </tbody>
            </table>
          </div>

          ${cartItems && cartItems.length > 0 ? `
          <div style="text-align: right; padding: 15px; background: white; border-radius: 8px;">
            <div style="color: #6b7280; margin-bottom: 5px;">
              Subtotal (${cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)} items): 
              <span style="color: #1f2937;">₹${Math.round(total).toLocaleString()}</span>
            </div>
            <div style="color: #059669; margin-bottom: 10px; font-weight: 600;">
              Shipping: FREE
            </div>
            <div style="font-size: 18px; font-weight: bold; color: #0d9488; border-top: 2px solid #e5e7eb; padding-top: 10px;">
              Estimated Total: ₹${total.toLocaleString()}
            </div>
          </div>
          ` : `
          <div style="text-align: center; padding: 20px; background: white; border-radius: 8px;">
            <div style="color: #6b7280; font-size: 16px;">
              🛏️ <strong>General Inquiry</strong><br>
              Our team will contact you with personalized recommendations and pricing.
            </div>
          </div>
          `}
        </div>

        <div style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 16px;">📞 What's Next?</h3>
          <ul style="color: #92400e; margin: 0; padding-left: 20px;">
            <li>Our team will review your requirements</li>
            <li>We'll prepare a detailed quotation with final pricing</li>
            <li>You'll receive the quote within 24 hours via email</li>
            <li>We'll also call you to discuss any specific requirements</li>
          </ul>
        </div>

        <div style="text-align: center; color: #6b7280; font-size: 14px;">
          <p>If you have any immediate questions, feel free to contact us:</p>
          <p style="margin: 10px 0;">
            📧 <a href="mailto:support@mattressstore.com" style="color: #0d9488;">support@mattressstore.com</a><br>
            📞 <a href="tel:+911234567890" style="color: #0d9488;">+91 123 456 7890</a>
          </p>
          <p style="margin-top: 30px;">
            Thank you for choosing our premium mattress collection!
          </p>
        </div>
      </div>
    `;

    // Email template for the admin/company
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #dc2626; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🔔 New Quote Request</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0;">
            A customer has requested a quotation
          </p>
        </div>

        <div style="background: #f9fafb; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Customer Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 30%;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Phone:</td>
              <td style="padding: 8px 0; color: #1f2937;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Email:</td>
              <td style="padding: 8px 0; color: #1f2937;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #374151;">Request Time:</td>
              <td style="padding: 8px 0; color: #1f2937;">${new Date(timestamp).toLocaleString()}</td>
            </tr>
          </table>
          ${message ? `
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #0d9488;">
              <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">Additional Message:</h3>
              <p style="margin: 0; color: #4b5563; font-style: italic;">"${message}"</p>
            </div>
          ` : ''}
        </div>

        <div style="background: #f9fafb; padding: 25px; border-radius: 10px;">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Requested Items</h2>
          
          <div style="background: white; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 15px; text-align: left; font-weight: 600; color: #374151;">Product</th>
                  <th style="padding: 15px; text-align: center; font-weight: 600; color: #374151;">Qty</th>
                  <th style="padding: 15px; text-align: right; font-weight: 600; color: #374151;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${cartItemsHtml}
              </tbody>
            </table>
          </div>

          ${cartItems && cartItems.length > 0 ? `
          <div style="text-align: right; padding: 15px; background: white; border-radius: 8px;">
            <div style="font-size: 18px; font-weight: bold; color: #dc2626;">
              Total Quote Value: ₹${total.toLocaleString()}
            </div>
            <div style="color: #6b7280; font-size: 14px; margin-top: 5px;">
              ${cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0)} items total
            </div>
          </div>
          ` : `
          <div style="text-align: center; padding: 20px; background: white; border-radius: 8px;">
            <div style="color: #6b7280; font-size: 16px;">
              🛏️ <strong>General Inquiry</strong><br>
              Customer interested in mattress options - no specific cart items.
            </div>
          </div>
          `}
        </div>

        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin-top: 25px;">
          <h3 style="color: #dc2626; margin: 0 0 10px 0; font-size: 16px;">⚡ Action Required</h3>
          <p style="color: #991b1b; margin: 0;">
            Please prepare and send a detailed quotation to <strong>${email}</strong> within 24 hours.
            Don't forget to call <strong>${phone}</strong> to discuss specific requirements.
          </p>
        </div>
      </div>
    `;

    // Send email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: '✅ Quote Request Received - Premium Mattress Collection',
      html: customerEmailHtml,
    });

    // Send email to admin/company
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.ADMIN_EMAIL || 'admin@mattressstore.com',
      subject: `🔔 New Quote Request from ${name} - ₹${total.toLocaleString()}`,
      html: adminEmailHtml,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request sent successfully!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending quote request:', error);
    return NextResponse.json(
      { error: 'Failed to send quote request' },
      { status: 500 }
    );
  }
}
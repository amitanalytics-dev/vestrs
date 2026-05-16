import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email } = await req.json()

    if (!name?.trim() || !email?.includes('@')) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Vestrs Waitlist <onboarding@resend.dev>',
      to: ['amit_tyagi2012@pgp.isb.edu'],
      subject: `New waitlist signup — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
          <h2 style="margin:0 0 24px;font-size:22px;">New Vestrs Waitlist Signup</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:13px;width:80px;">Name</td>
              <td style="padding:10px 0;font-weight:600;font-size:14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:13px;">Email</td>
              <td style="padding:10px 0;font-weight:600;font-size:14px;">${email}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#6b7280;font-size:13px;">Phone</td>
              <td style="padding:10px 0;font-weight:600;font-size:14px;">${phone || '—'}</td>
            </tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist email error:', err)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}

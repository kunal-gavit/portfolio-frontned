import { NextResponse } from 'next/server';

// Simple in-memory rate limiting map (IP -> last timestamp)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const records = rateLimitMap.get(ip) || [];
  const validRecords = records.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (validRecords.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validRecords.push(now);
  rateLimitMap.set(ip, validRecords);
  return false;
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local-client';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many messages sent. Please wait a minute before trying again.'
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields (Name, Email, Message).'
        },
        { status: 400 }
      );
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedSubject = String(subject || 'General Inquiry').trim();
    const trimmedMessage = String(message).trim();

    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, message: 'Name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 5) {
      return NextResponse.json(
        { success: false, message: 'Message must be at least 5 characters.' },
        { status: 400 }
      );
    }

    const submissionData = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
      ip: ip.split(',')[0].trim()
    };

    console.log('[Backend API /api/contact] New Message Received:', {
      id: submissionData.id,
      name: submissionData.name,
      email: submissionData.email,
      subject: submissionData.subject,
      timestamp: submissionData.timestamp
    });

    // If SMTP / Webhook / Resend API key is configured in process.env:
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Portfolio <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'kunalgavit285@gmail.com',
            subject: `[Portfolio Contact] ${trimmedSubject} - from ${trimmedName}`,
            text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}`
          })
        });
      } catch (emailErr) {
        console.error('[Backend API /api/contact] Resend dispatch error:', emailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been successfully received. Kunal will reply within 24 hours!',
        data: {
          messageId: submissionData.id,
          receivedAt: submissionData.timestamp,
          sender: trimmedName
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Backend API /api/contact Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error processing transmission. Please reach out directly to kunalgavit285@gmail.com'
      },
      { status: 500 }
    );
  }
}

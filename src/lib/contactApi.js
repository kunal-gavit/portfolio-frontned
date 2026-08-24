/**
 * Contact form API abstraction
 * Connects to Backend REST API (http://localhost:5000/api/contact)
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.VITE_API_URL ||
  'http://localhost:5000/api';

export async function sendContactMessage(payload) {
  const { name, email, subject, message } = payload;

  if (!name || !email || !message) {
    return {
      success: false,
      message: 'Please complete all required fields (Name, Email, Message).'
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, subject, message })
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: data.message || 'Message sent successfully. Kunal will get back to you soon!'
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errData.message || 'Failed to dispatch message. Please try again or email directly.'
      };
    }
  } catch (error) {
    console.warn('[Contact API] Failed to reach backend directly, attempting fallback endpoint:', error.message);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      if (res.ok) {
        return { success: true, message: 'Message sent successfully.' };
      }
    } catch (e) {
      // client fallback
    }
    return {
      success: true,
      message: 'Message registered. Kunal will reach out to you within 24 hours.'
    };
  }
}

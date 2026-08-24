import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    framework: 'Next.js App Router',
    services: {
      contactApi: 'active',
      projectsApi: 'active',
      skillsApi: 'active',
      hackathonsApi: 'active',
      blogApi: 'active'
    }
  });
}

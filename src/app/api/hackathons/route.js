import { NextResponse } from 'next/server';
import { getHackathons, getHackathonById } from '../../../lib/data.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || searchParams.get('id');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    if (slug) {
      const hackathon = getHackathonById(slug);
      if (!hackathon) {
        return NextResponse.json(
          { success: false, message: 'Hackathon story not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: hackathon });
    }

    let hackathons = getHackathons();

    if (featured === 'true') {
      hackathons = hackathons.filter((h) => h.featured);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      hackathons = hackathons.filter(
        (h) =>
          h.name?.toLowerCase().includes(q) ||
          h.projectName?.toLowerCase().includes(q) ||
          h.result?.toLowerCase().includes(q) ||
          h.solutionSummary?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: hackathons.length,
      data: hackathons
    });
  } catch (error) {
    console.error('[API /api/hackathons Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch hackathons' },
      { status: 500 }
    );
  }
}

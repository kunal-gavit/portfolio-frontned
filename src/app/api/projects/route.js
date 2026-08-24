import { NextResponse } from 'next/server';
import { getProjects, getProjectById } from '../../../lib/data.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const slug = searchParams.get('slug') || searchParams.get('id');

    if (slug) {
      const project = getProjectById(slug);
      if (!project) {
        return NextResponse.json(
          { success: false, message: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: project });
    }

    let projects = getProjects();

    if (featured === 'true') {
      projects = projects.filter((p) => p.featured);
    }

    if (category && category !== 'All') {
      projects = projects.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase().trim();
      projects = projects.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          (p.techStack || p.technologies || []).some((t) =>
            t.toLowerCase().includes(q)
          )
      );
    }

    if (limit) {
      const numLimit = parseInt(limit, 10);
      if (!isNaN(numLimit) && numLimit > 0) {
        projects = projects.slice(0, numLimit);
      }
    }

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('[API /api/projects Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

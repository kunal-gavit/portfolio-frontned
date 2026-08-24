import { NextResponse } from 'next/server';
import { getBlogs, getBlogBySlug } from '../../../lib/data.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') || searchParams.get('id');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    if (slug) {
      const blog = getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: 'Article not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog });
    }

    let blogs = getBlogs();

    if (category && category !== 'All') {
      blogs = blogs.filter(
        (b) => b.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag && tag !== 'All') {
      blogs = blogs.filter((b) => (b.tags || []).includes(tag));
    }

    if (search) {
      const q = search.toLowerCase().trim();
      blogs = blogs.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.description?.toLowerCase().includes(q) ||
          b.summary?.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('[API /api/blog Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog articles' },
      { status: 500 }
    );
  }
}

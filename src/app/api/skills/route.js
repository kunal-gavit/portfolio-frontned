import { NextResponse } from 'next/server';
import { getSkills } from '../../../lib/data.js';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain') || searchParams.get('category');
    const search = searchParams.get('search');

    let skillCategories = getSkills();

    if (domain && domain !== 'All') {
      skillCategories = skillCategories.filter(
        (c) => c.domain?.toLowerCase() === domain.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase().trim();
      skillCategories = skillCategories
        .map((cat) => ({
          ...cat,
          skills: (cat.skills || cat.items || []).filter(
            (s) =>
              s.name?.toLowerCase().includes(q) ||
              s.description?.toLowerCase().includes(q)
          )
        }))
        .filter((cat) => cat.skills.length > 0);
    }

    const totalSkills = skillCategories.reduce(
      (acc, cat) => acc + (cat.skills || cat.items || []).length,
      0
    );

    return NextResponse.json({
      success: true,
      categoriesCount: skillCategories.length,
      totalSkillsCount: totalSkills,
      data: skillCategories
    });
  } catch (error) {
    console.error('[API /api/skills Error]:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

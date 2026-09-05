import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projects = await sql`
      SELECT * FROM projects ORDER BY created_at DESC
    `;
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, category, image_url, project_url, github_url, is_featured } = body;

    const newProject = await sql`
      INSERT INTO projects (title, description, category, image_url, project_url, github_url, is_featured)
      VALUES (${title}, ${description}, ${category || 'Sistemas'}, ${image_url}, ${project_url || null}, ${github_url || null}, ${is_featured || false})
      RETURNING *
    `;

    return NextResponse.json(newProject[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, category, image_url, project_url, github_url, is_featured } = body;

    const updated = await sql`
      UPDATE projects
      SET title=${title}, description=${description}, category=${category}, image_url=${image_url}, project_url=${project_url}, github_url=${github_url}, is_featured=${is_featured}
      WHERE id=${id}
      RETURNING *
    `;

    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await sql`DELETE FROM projects WHERE id=${id}`;
    return NextResponse.json({ message: 'Deletado com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

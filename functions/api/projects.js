// functions/api/projects.js
import { neon } from '@neondatabase/serverless';

export async function onRequestGet(context) {
  try {
    const sql = neon(context.env.DATABASE_URL);
    const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    
    return new Response(JSON.stringify(projects), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequestPost(context) {
  try {
    const sql = neon(context.env.DATABASE_URL);
    const body = await context.request.json();
    const { title, description, category, image_url, project_url, github_url, is_featured } = body;

    const newProject = await sql`
      INSERT INTO projects (title, description, category, image_url, project_url, github_url, is_featured)
      VALUES (${title}, ${description}, ${category || 'Sistemas'}, ${image_url}, ${project_url || null}, ${github_url || null}, ${is_featured || false})
      RETURNING *
    `;

    return new Response(JSON.stringify(newProject[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

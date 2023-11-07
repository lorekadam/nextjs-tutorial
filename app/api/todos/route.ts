import { Todo } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await sql<Todo>`SELECT * FROM todos`;

  // return Response.json(data.rows);
  return NextResponse.json(data.rows);
}

export async function POST(request: Request) {
  const { name, description, done } = await request.json();

  try {
    await sql`
      INSERT INTO todos (name,description,done)
      VALUES (${name}, ${description}, ${done})
    `;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: Request) {
  const id = await request.json();
  try {
    await sql`DELETE FROM todos WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

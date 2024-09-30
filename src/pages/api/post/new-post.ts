import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!title || !content) {
    return new Response("Title and content are required", { status: 400 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response("You must be logged in to create a post", { status: 401 });
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, user_id: user.id }]);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};

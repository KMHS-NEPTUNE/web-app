import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const image = formData.get("image") as File;

  if (!title || !content) {
    return new Response("Title and content are required", { status: 400 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response("You must be logged in to create a post", { status: 401 });
  }

  let imageUrl = null;
  if (image) {
    const { data, error: uploadError } = await supabase
        .storage
        .from('Image')
        .upload(`public/${Date.now()}_${image.name}`, image);

    if (uploadError) {
      return new Response(uploadError.message, { status: 500 });
    }

    imageUrl = data?.path ? supabase.storage.from('Image').getPublicUrl(data.path).data.publicUrl : null;
  }

  const { error } = await supabase
      .from('posts')
      .insert([{ title, content, user_id: user.id, image_url: imageUrl, created_at: new Date().toISOString() }]);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/board" }
  });
};

// new-comment.ts
// noinspection ExceptionCaughtLocallyJS

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const content = formData.get("content")?.toString();
    const post_id = formData.get("post_id")?.toString();

    if (!content) {
      return new Response(JSON.stringify({ error: 'Comment is required' }), {
        status: 400,
      });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response("You must be logged in to create a post", { status: 401 });
    }

    const { error } = await supabase
      .from('comments')
      .insert([{ content: decodeURI(content), user_id: user.id, post_id }]);

    if (error) {
      throw error;
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: `/bbs/${post_id}`,
      },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

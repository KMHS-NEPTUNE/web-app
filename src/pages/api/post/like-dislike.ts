import { supabase } from '../../../lib/supabase';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { postId, action } = await request.json();

  if (!postId || !['like', 'dislike'].includes(action)) {
    return new Response('Invalid request', { status: 400 });
  }

  const column = action === 'like' ? 'like_count' : 'dislike_count';

  const { data: currentData, error: fetchError } = await supabase
      .from('posts')
      .select(column)
      .eq('id', postId)
      .single();

  if (fetchError) {
    return new Response(JSON.stringify(fetchError), { status: 500 });
  }

  const newValue = (currentData as { like_count: number; dislike_count: number })[column] + 1;

  const { data, error } = await supabase
      .from('posts')
      .update({ [column]: newValue })
      .eq('id', postId);

  if (error) {
    return new Response('Error updating post', { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

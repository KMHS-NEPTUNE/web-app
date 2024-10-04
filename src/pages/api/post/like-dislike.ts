import { supabase } from '../../../lib/supabase';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const { postId, action } = await request.json();

  if (!postId || !['like', 'dislike'].includes(action)) {
    return new Response('Invalid request', { status: 400 });
  }

  const column = action === 'like' ? 'like_count' : 'dislike_count';

  //@ts-ignore
  const { data: currentData, error: fetchError } = await supabase
      .from('posts')
      .select(column)
      .eq('id', postId)
      .single() as { data: { like_count?: number; dislike_count?: number } };

  if (fetchError) {
    return new Response(JSON.stringify(fetchError), { status: 500 });
  }

  const newValue = (currentData[column as 'like_count' | 'dislike_count'] ?? 0) + 1;

  const { data, error } = await supabase
      .from('posts')
      .update({ [column]: newValue })
      .eq('id', postId);

  if (error) {
    return new Response('Error updating post', { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

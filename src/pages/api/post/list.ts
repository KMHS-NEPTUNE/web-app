import { supabase } from '../../../lib/supabase';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const { data, error } = await supabase.from('posts').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

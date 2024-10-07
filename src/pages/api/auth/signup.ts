import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();

  if (!email || !password || !username) {
    return new Response("Email, password, and username are required", { status: 400 });
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return new Response(signUpError.message, { status: 500 });
  }

  if (data.user) {
    const { error: profileError } = await supabase
        .schema('public')
        .from('profiles')
        .insert([{ 'id': data.user.id, 'username': username , 'email': data.user.email}]);

    if (profileError) {
      return new Response('aaaaaaa', { status: 500 });
    }
  } else {
    return new Response("User data is null", { status: 500 });
  }

  return redirect("/login");
};

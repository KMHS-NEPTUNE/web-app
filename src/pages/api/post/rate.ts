import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const postId = formData.get("post_id")?.toString();
    const rating = parseFloat(formData.get("rating")?.toString() || "0");

    if (!postId || isNaN(rating)) {
        return new Response("post_id, user_id, and rating are required", { status: 400 });
    }

    if (rating < 0 || rating > 5 || rating % 0.5 !== 0) {
        return new Response("Rating must be between 0 and 5 in 0.5 increments", { status: 400 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return new Response("You must be logged in to create a rating", { status: 401 });
    }

    const { data: existingRating, error: fetchError } = await supabase
        .from("ratings")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") {
        return new Response(fetchError.message, { status: 500 });
    }

    if (existingRating) {
        return new Response("User has already rated this post", { status: 400 });
    }

    const { error: insertError } = await supabase
        .from("ratings")
        .insert([{ post_id: postId, user_id: user.id, rating }]);

    if (insertError) {
        return new Response(insertError.message, { status: 500 });
    }

    return new Response("Rating added successfully", { status: 200 });
};

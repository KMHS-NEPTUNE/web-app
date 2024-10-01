import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response("File is required", { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
        .from("Image")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        });

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    const { data: { publicUrl }} = supabase.storage
        .from("Image")
        .getPublicUrl(fileName);

    if (error) {
        return new Response(JSON.stringify({"error": "yet"}), { status: 500 });
    }

    return new Response(JSON.stringify({ url: publicUrl }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

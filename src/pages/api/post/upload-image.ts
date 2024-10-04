import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return new Response("File is required", { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
        .from("Image")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        });

    if (uploadError) {
        return new Response(uploadError.message, { status: 500 });
    }

    // @ts-ignore
    const { data: { publicUrl }, error: urlError } = supabase.storage
        .from("Image")
        .getPublicUrl(fileName);

    if (urlError) {
        return new Response(urlError.message, { status: 500 });
    }

    return new Response(JSON.stringify({ url: publicUrl }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
};

// src/lib/supabase.ts

const SUPABASE_URL = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.SUPABASE_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Supabase URL and Anon Key must be provided.");
}

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

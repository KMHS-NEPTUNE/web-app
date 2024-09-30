// src/lib/supabase.ts
import cloudflare from '@astrojs/cloudflare';

const SUPABASE_URL = "https://fyfddznmykxjmmvvdyeo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZmRkem5teWt4am1tdnZkeWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2NjAzOTQsImV4cCI6MjA0MzIzNjM5NH0.9Ec-XgNjlQLhkfgdfhZlF-yQF-NOdOZu6wdQmeV4X4M";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Supabase URL and Anon Key must be provided.");
}

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

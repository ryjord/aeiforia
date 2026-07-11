// Libs
import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

// Create Supabase client
export function createClient() {
  const env = supabaseEnv();
  if (!env) {
    throw new Error("Supabase env vars are not configured.");
  }

  return createBrowserClient(env.url, env.key);
}

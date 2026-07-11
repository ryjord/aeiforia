// Libs
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseEnv } from "./env";

// Create Supabase client
export async function createClient() {
  const env = supabaseEnv();
  if (!env) {
    throw new Error("Supabase env vars are not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Ignore if called from a Server Component
        }
      },
    },
  });
}

import { Database } from "supabase/schema";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_JWT_SECRET!
  );
};

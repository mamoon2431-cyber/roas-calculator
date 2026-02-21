import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zpacqzvjzvbomrbhabtf.supabase.co";
const supabaseKey = "sb_publishable_5K2L2Kzgzdup8Ls_XDZgGQ_4nDvBCV7";

export const supabase = createClient(supabaseUrl, supabaseKey);
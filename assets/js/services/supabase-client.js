import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { CONFIG_ERRORS } from "../utils/constants.js";
import { getConfig, isNonEmptyString } from "../utils/helpers.js";

function validateConfig() {
  const config = getConfig();

  if (!window.APP_CONFIG) {
    return { ok: false, message: CONFIG_ERRORS.MISSING_CONFIG };
  }

  if (!isNonEmptyString(config.SUPABASE_URL)) {
    return { ok: false, message: CONFIG_ERRORS.MISSING_URL };
  }

  if (!isNonEmptyString(config.SUPABASE_ANON_KEY)) {
    return { ok: false, message: CONFIG_ERRORS.MISSING_KEY };
  }

  return { ok: true, config };
}

export function getSupabaseClient() {
  const validation = validateConfig();

  if (!validation.ok) {
    return { client: null, error: validation.message };
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = validation.config;
  const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return { client, error: null };
}

export async function testSupabaseConnection() {
  const validation = validateConfig();

  if (!validation.ok) {
    return { ok: false, message: validation.message };
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = validation.config;
  const endpoint = `${SUPABASE_URL.replace(/\/$/, "")}/auth/v1/settings`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY
      }
    });

    if (!response.ok) {
      return { ok: false, message: `تعذر الاتصال: HTTP ${response.status}` };
    }

    return { ok: true, message: "تم الاتصال بنجاح مع Supabase." };
  } catch (error) {
    return { ok: false, message: `فشل الاتصال بالشبكة: ${error.message}` };
  }
}

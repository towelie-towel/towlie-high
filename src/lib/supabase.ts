import { createClient } from '@supabase/supabase-js';
import { env } from '~/env';

export function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number | undefined;
}) {
  return `https://${env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/images/${src}?width=${width}&quality=${quality ?? 75}`;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

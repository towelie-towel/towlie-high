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

// Function to determine the execution context
const isServer = () => typeof window === 'undefined';

// Use the appropriate set of environment variables
const SUPABASE_URL = isServer() ? env.SUPABASE_URL : env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = isServer() ? env.SUPABASE_ANON_KEY : env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
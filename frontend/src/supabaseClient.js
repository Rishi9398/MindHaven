import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project details
const SUPABASE_URL = 'https://nlyfrefiekzyaxemwxkf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seWZyZWZpZWt6eWF4ZW13eGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0ODczMjcsImV4cCI6MjA0OTA2MzMyN30.-lCihK2_pC9bN-dywN0OmobvPVrCbYURbA3N1a_QIDA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

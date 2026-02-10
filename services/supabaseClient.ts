
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://plaldwmttlgtvydglnal.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWxkd210dGxndHZ5ZGdsbmFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDgyMzcsImV4cCI6MjA4NjI4NDIzN30.qB2n_1-_fvRSlTH2GTWw8qjl854Ydl3vG5mzyf9v38U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

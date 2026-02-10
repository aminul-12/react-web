
-- 1. ADD MISSING COLUMNS
-- This fixes the "Could not find column in schema cache" error
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS transcript_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_country TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gpa TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ielts_score JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport JSONB;

-- 2. CREATE A NON-RECURSIVE SECURITY FUNCTION
-- This fixes the "Infinite Recursion" error by bypassing policy checks for role lookups
CREATE OR REPLACE FUNCTION public.is_admin_v2()
RETURNS boolean AS $$
BEGIN
  RETURN (
    SELECT (role = 'admin')
    FROM public.profiles
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. RESET AND RE-APPLY CLEAN POLICIES
-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable select for users own profile or admins" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users own profile or admins" ON public.profiles;
DROP POLICY IF EXISTS "Public can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "p_select" ON public.profiles;
DROP POLICY IF EXISTS "p_insert" ON public.profiles;
DROP POLICY IF EXISTS "p_update" ON public.profiles;

-- Create high-performance, safe policies
CREATE POLICY "p_select" ON public.profiles 
FOR SELECT USING (auth.uid() = id OR public.is_admin_v2());

CREATE POLICY "p_insert" ON public.profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "p_update" ON public.profiles 
FOR UPDATE USING (auth.uid() = id OR public.is_admin_v2());

-- 4. FIX CONSULTATIONS TABLE (ADMIN ACCESS)
DROP POLICY IF EXISTS "Admins can view consultations" ON public.consultations;
CREATE POLICY "p_consultations_admin" 
ON public.consultations FOR ALL 
USING (public.is_admin_v2());

-- 5. CRITICAL: FORCE SCHEMA CACHE RELOAD
-- This tells the Supabase API to recognize the new columns immediately
NOTIFY pgrst, 'reload schema';

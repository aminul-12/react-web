
-- 1. Ensure the Storage Bucket exists and is Public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('student-docs', 'student-docs', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Allow Authenticated users to upload files
-- We add DROP POLICY to prevent errors if you run this script multiple times
DROP POLICY IF EXISTS "Users can upload their own docs" ON storage.objects;
CREATE POLICY "Users can upload their own docs"
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'student-docs');

-- 3. Allow everyone to view the files (since it's a public bucket)
DROP POLICY IF EXISTS "Public Access to Docs" ON storage.objects;
CREATE POLICY "Public Access to Docs"
ON storage.objects FOR SELECT 
TO public 
USING (bucket_id = 'student-docs');

-- 4. Allow users to update/overwrite their own files
DROP POLICY IF EXISTS "Users can update their own docs" ON storage.objects;
CREATE POLICY "Users can update their own docs"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'student-docs');

-- 5. Re-confirm profile columns exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS transcript_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_country TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gpa TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS ielts_score JSONB;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS passport JSONB;

-- 6. Refresh schema cache
NOTIFY pgrst, 'reload schema';

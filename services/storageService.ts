
import { supabase } from './supabaseClient';

export const storageService = {
  uploadDocument: async (userId: string, file: File, type: 'avatar' | 'passport' | 'transcript'): Promise<string> => {
    // 1. Sanitize file name and create a clean path
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    try {
      // 2. Upload to storage bucket
      const { error: uploadError, data } = await supabase.storage
        .from('student-docs')
        .upload(filePath, file, { 
          upsert: true,
          contentType: file.type,
          cacheControl: '3600'
        });

      if (uploadError) {
        console.error('Supabase Storage Error:', uploadError);
        if (uploadError.message.includes('bucket not found')) {
          throw new Error('Storage bucket "student-docs" does not exist. Please run the SQL setup script.');
        }
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('student-docs')
        .getPublicUrl(filePath);

      // 4. Map the frontend type to exact DB column names (SNAKE_CASE)
      const dbFieldMap = {
        avatar: 'avatar_url',
        passport: 'passport_url',
        transcript: 'transcript_url'
      };
      
      const dbField = dbFieldMap[type];

      // 5. Update the profile record with the new URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ [dbField]: publicUrl })
        .eq('id', userId);

      if (updateError) {
        console.error('Database Profile Sync Error:', updateError);
        throw new Error(`File uploaded, but profile update failed: ${updateError.message}`);
      }

      return publicUrl;
    } catch (err: any) {
      console.error('Full Storage Service Error:', err);
      throw err;
    }
  }
};

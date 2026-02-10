
import { supabase } from './supabaseClient';

export const storageService = {
  uploadDocument: async (userId: string, file: File, type: 'avatar' | 'passport' | 'transcript'): Promise<string> => {
    // 1. Generate path: userId/type_timestamp.ext
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // 2. Upload to storage bucket
    const { error: uploadError } = await supabase.storage
      .from('student-docs')
      .upload(filePath, file, { 
        upsert: true,
        contentType: file.type
      });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      throw new Error(`Storage upload failed: ${uploadError.message}`);
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
      console.error('Database Update Error:', updateError);
      throw new Error(`Profile sync failed: ${updateError.message}. Please ensure database columns exist.`);
    }

    return publicUrl;
  }
};

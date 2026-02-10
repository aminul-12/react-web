
import { User } from '../types';
import { supabase } from './supabaseClient';

export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // If no profile found, return a minimal user object from auth session
      if (error || !profile) {
        return {
          id: session.user.id,
          name: session.user.user_metadata.full_name || 'Student',
          email: session.user.email || '',
          role: 'user',
          createdAt: session.user.created_at,
          lastLogin: new Date().toISOString(),
        };
      }

      return {
        id: profile.id,
        name: profile.name,
        email: profile.email || session.user.email || '',
        role: profile.role || 'user',
        createdAt: profile.created_at,
        lastLogin: profile.last_login,
        phone: profile.phone,
        preferredCountry: profile.preferred_country,
        gpa: profile.gpa,
        ieltsScore: profile.ielts_score,
        passport: profile.passport,
        avatarUrl: profile.avatar_url,
        passportUrl: profile.passport_url,
        transcriptUrl: profile.transcript_url
      };
    } catch (err) {
      console.error('Session error:', err);
      return null;
    }
  },

  getUsers: async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email || 'No Email Recorded',
      role: p.role || 'user',
      createdAt: p.created_at,
      lastLogin: p.last_login,
      gpa: p.gpa,
      ieltsScore: p.ielts_score,
      phone: p.phone,
      avatarUrl: p.avatar_url,
      passportUrl: p.passport_url,
      transcriptUrl: p.transcript_url
    }));
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (authError) throw authError;
    if (!data.user) throw new Error('Account creation failed');

    // Use upsert to be safe - creates profile if missing, updates if exists
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({ 
        id: data.user.id, 
        name: name,
        email: email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      }, { onConflict: 'id' });

    if (profileError) {
      console.warn('Profile sync warning:', profileError.message);
    }

    return {
      id: data.user.id,
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
  },

  login: async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error('Login failed');

    // Record last login
    await supabase
      .from('profiles')
      .upsert({ 
        id: data.user.id, 
        last_login: new Date().toISOString(),
        email: data.user.email // Ensure email is always updated in profile
      }, { onConflict: 'id' });

    const fullUser = await authService.getCurrentUser();
    if (!fullUser) throw new Error('Profile loading error');
    return fullUser;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  updateProfile: async (updatedData: Partial<User>): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // Use upsert instead of update to ensure record exists
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        name: updatedData.name,
        phone: updatedData.phone,
        preferred_country: updatedData.preferredCountry,
        gpa: updatedData.gpa,
        ielts_score: updatedData.ieltsScore,
        passport: updatedData.passport
      }, { onConflict: 'id' });

    if (error) throw error;
    return authService.getCurrentUser();
  },

  resetPassword: async (email: string, newPassword?: string): Promise<void> => {
    if (newPassword) {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
};

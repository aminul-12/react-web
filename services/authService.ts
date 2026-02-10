
import { User } from '../types';
import { supabase } from './supabaseClient';

export const authService = {
  getCurrentUser: async (): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) return null;

    return {
      id: profile.id,
      name: profile.name,
      email: session.user.email || '',
      role: profile.role || 'user',
      createdAt: profile.created_at,
      lastLogin: profile.last_login,
      phone: profile.phone,
      preferredCountry: profile.preferred_country,
      gpa: profile.gpa,
      ieltsScore: profile.ielts_score,
      passport: profile.passport
    };
  },

  // Added getUsers to fix "Property 'getUsers' does not exist" error in ForgotPassword.tsx
  getUsers: async (): Promise<User[]> => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) return [];
    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email || '',
      role: p.role || 'user',
      createdAt: p.created_at,
      lastLogin: p.last_login
    }));
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('Signup failed');

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: data.user.id, 
          name: name,
          role: 'user',
          created_at: new Date().toISOString()
        }
      ]);

    if (profileError) throw profileError;

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

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return {
      id: data.user.id,
      name: profile?.name || data.user.user_metadata.full_name || 'Student',
      email: data.user.email || '',
      role: profile?.role || 'user',
      createdAt: profile?.created_at || new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      phone: profile?.phone,
      preferredCountry: profile?.preferred_country,
      gpa: profile?.gpa,
      ieltsScore: profile?.ielts_score,
      passport: profile?.passport
    };
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  updateProfile: async (updatedData: Partial<User>): Promise<User | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { error } = await supabase
      .from('profiles')
      .update({
        name: updatedData.name,
        phone: updatedData.phone,
        preferred_country: updatedData.preferredCountry,
        gpa: updatedData.gpa,
        ielts_score: updatedData.ieltsScore,
        passport: updatedData.passport
      })
      .eq('id', session.user.id);

    if (error) throw error;
    return authService.getCurrentUser();
  },

  // Updated resetPassword to accept an optional newPassword to fix parameter count error in ForgotPassword.tsx
  resetPassword: async (email: string, newPassword?: string): Promise<void> => {
    if (newPassword) {
      // If newPassword is provided, update the user's password.
      // This typically works when called within a recovery session.
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
};

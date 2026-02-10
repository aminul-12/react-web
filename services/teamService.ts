
import { TeamMember } from '../types';
import { supabase } from './supabaseClient';

export const teamService = {
  getMembers: async (): Promise<TeamMember[]> => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      console.error('Error fetching team:', error);
      return [];
    }

    return data.map(m => ({
      id: m.id,
      name: m.name,
      designation: m.designation,
      bio: m.bio,
      imageUrl: m.image_url,
      email: m.email,
      socialLinks: m.social_links || {},
      status: m.status,
      order: m.order
    }));
  },

  getActiveMembers: async (): Promise<TeamMember[]> => {
    const members = await teamService.getMembers();
    return members.filter(m => m.status === 'active');
  },

  addMember: async (member: Omit<TeamMember, 'id'>): Promise<TeamMember | null> => {
    const { data, error } = await supabase
      .from('team_members')
      .insert([{
        name: member.name,
        designation: member.designation,
        bio: member.bio,
        image_url: member.imageUrl,
        email: member.email,
        social_links: member.socialLinks,
        status: member.status,
        order: member.order
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateMember: async (id: string, updates: Partial<TeamMember>): Promise<void> => {
    const { error } = await supabase
      .from('team_members')
      .update({
        name: updates.name,
        designation: updates.designation,
        bio: updates.bio,
        image_url: updates.imageUrl,
        email: updates.email,
        social_links: updates.socialLinks,
        status: updates.status,
        order: updates.order
      })
      .eq('id', id);

    if (error) throw error;
  },

  deleteMember: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

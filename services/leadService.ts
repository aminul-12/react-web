
import { ConsultationBooking } from '../types';
import { supabase } from './supabaseClient';

export const leadService = {
  submitLead: async (lead: Omit<ConsultationBooking, 'id' | 'status' | 'date'>): Promise<void> => {
    // Explicitly mapping frontend keys to database column names
    const { error } = await supabase
      .from('consultations')
      .insert([{
        student_name: lead.studentName,
        email: lead.email,
        phone: lead.phone || null,
        target_country: lead.targetCountry,
        gpa: lead.gpa || null,
        ielts_score: lead.ieltsScore || null,
        message: lead.message || null,
        status: 'pending'
      }]);

    if (error) {
      console.error('Supabase Lead Submission Error:', error);
      throw error;
    }
  },

  getLeads: async (): Promise<ConsultationBooking[]> => {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Fetch Leads Error:', error);
      throw error;
    }

    if (!data) return [];

    return data.map(d => ({
      id: d.id,
      studentName: d.student_name,
      email: d.email,
      phone: d.phone,
      targetCountry: d.target_country,
      gpa: d.gpa,
      ieltsScore: d.ielts_score,
      message: d.message,
      status: d.status,
      date: new Date(d.created_at).toLocaleDateString()
    }));
  },

  updateLeadStatus: async (id: string, status: ConsultationBooking['status']): Promise<void> => {
    const { error } = await supabase
      .from('consultations')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Supabase Update Status Error:', error);
      throw error;
    }
  }
};

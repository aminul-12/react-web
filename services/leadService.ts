
import { ConsultationBooking } from '../types';
import { supabase } from './supabaseClient';

export const leadService = {
  submitLead: async (lead: Omit<ConsultationBooking, 'id' | 'status' | 'date'> & { message: string }): Promise<void> => {
    const { error } = await supabase
      .from('consultations')
      .insert([{
        student_name: lead.studentName,
        email: lead.email,
        phone: lead.phone,
        target_country: lead.targetCountry,
        message: lead.message,
        status: 'pending'
      }]);

    if (error) throw error;
  },

  getLeads: async (): Promise<ConsultationBooking[]> => {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(d => ({
      id: d.id,
      studentName: d.student_name,
      email: d.email,
      phone: d.phone,
      targetCountry: d.target_country,
      status: d.status,
      date: new Date(d.created_at).toLocaleDateString()
    }));
  },

  updateLeadStatus: async (id: string, status: ConsultationBooking['status']): Promise<void> => {
    const { error } = await supabase
      .from('consultations')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
  }
};

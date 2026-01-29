import { getSupabase } from '@/lib/supabase';
import type { Conversation, NewConversation } from '@/types';

export async function saveMessage(
  message: NewConversation
): Promise<Conversation | null> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert(message)
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in saveMessage:', error);
    return null;
  }
}

export async function getSessionMessages(
  sessionId: string
): Promise<Conversation[]> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSessionMessages:', error);
    return [];
  }
}

export async function getRecentMessages(
  sessionId: string,
  limit: number = 20
): Promise<Conversation[]> {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent messages:', error);
      return [];
    }

    return (data || []).reverse();
  } catch (error) {
    console.error('Error in getRecentMessages:', error);
    return [];
  }
}

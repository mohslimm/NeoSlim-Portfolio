import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for database tables
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'design' | 'development' | 'productivity';
  antigravity_score: number;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  created_at: string;
}

// Project CRUD operations
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
}

export async function getProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Project;
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('projects')
    .insert([project])
    .select()
    .single();
  
  if (error) throw error;
  return data as Project;
}

export async function updateProject(id: string, project: Partial<Project>) {
  const { data, error } = await supabase
    .from('projects')
    .update({ ...project, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Project;
}

export async function deleteProject(id: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Stats operations
export async function getStats() {
  const { data, error } = await supabase
    .from('stats')
    .select('*');
  
  if (error) throw error;
  return data as Stat[];
}

export async function updateStat(id: string, value: number) {
  const { data, error } = await supabase
    .from('stats')
    .update({ value })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Stat;
}

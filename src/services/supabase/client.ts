import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { API_KEYS } from '../../constants';

// Inicializa o cliente Supabase apenas se as credenciais estiverem corretamente configuradas
let supabase: SupabaseClient | null = null;
const { SUPABASE_URL, SUPABASE_ANON_KEY } = API_KEYS;

// Verifica se as variáveis não são os valores padrão do template
if (SUPABASE_URL && !SUPABASE_URL.includes('YOUR_') && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('YOUR_')) {
  // Cria um cliente Supabase com as credenciais fornecidas
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  // Exibe aviso no console caso as credenciais não estejam configuradas
  console.warn('Credenciais Supabase não configuradas. Cliente Supabase desabilitado.');
}

export { supabase };

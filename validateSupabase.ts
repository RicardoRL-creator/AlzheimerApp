// Script para validar conexão com Supabase via Node.js
// Requer .env com SUPABASE_URL e SUPABASE_ANON_KEY
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variáveis SUPABASE_URL e SUPABASE_ANON_KEY não estão definidas.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

(async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Erro ao validar Supabase:', error);
    process.exit(1);
  }
  console.log('Supabase session válida:', data.session);
  process.exit(0);
})();

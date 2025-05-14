// Paleta de cores padrão do aplicativo
export const COLORS = {
  primary: '#007bff',    // Azul primário para elementos principais
  secondary: '#6c757d',  // Cinza para elementos secundários
  white: '#ffffff',      // Branco para fundos e textos sobre fundos escuros
  black: '#000000',      // Preto para textos primários
  // Adicione mais cores conforme necessário
};

// Chaves de API e configurações de serviços externos
export const API_KEYS = {
  // URL base do projeto Supabase (lido de variáveis de ambiente ou valor padrão)
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL',
  
  // Chave anônima para autenticação no Supabase
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY',
};

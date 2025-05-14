import React, { createContext, useState, useContext, ReactNode } from 'react';

// Contexto de Autenticação fictícia para perfis de Cuidador e Pessoa Assistida

export type PerfilUsuario = 'cuidador' | 'pessoa_assistida';

export interface Usuario {
  id: string;
  nome: string;
  perfil: PerfilUsuario;
}

interface ContextoAutenticacao {
  // Versão em Português
  usuario: Usuario | null;
  definirUsuario: (usuario: Usuario) => void;
  alternarPerfil: (perfil: PerfilUsuario) => void;
  // Aliases em Inglês
  user: Usuario | null;
  setUser: (usuario: Usuario) => void;
  switchRole: (perfil: PerfilUsuario) => void;
  // Alias para perfil em Inglês
  role: PerfilUsuario | null;
}

// Criação do contexto de autenticação
const ContextoAutenticacao = createContext<ContextoAutenticacao | undefined>(undefined);

// Usuários fictícios pré-definidos para simulação da autenticação
const USUARIOS_FICTICIOS: Record<PerfilUsuario, Usuario> = {
  cuidador: {
    id: '1',
    nome: 'Cuidador Teste',
    perfil: 'cuidador',
  },
  pessoa_assistida: {
    id: '2',
    nome: 'Pessoa Assistida Teste',
    perfil: 'pessoa_assistida',
  },
};

// Provider que disponibiliza funções de autenticação para a aplicação
export const ProvedorAutenticacao = ({ children }: { children: ReactNode }) => {
  // Estado para armazenar o usuário atual, inicializado como cuidador
  const [usuario, definirUsuario] = useState<Usuario>(USUARIOS_FICTICIOS.cuidador);

  // Função para alternar entre os perfis de cuidador e pessoa assistida
  const alternarPerfil = (perfil: PerfilUsuario) => {
    definirUsuario(USUARIOS_FICTICIOS[perfil]);
  };

  return (
    <ContextoAutenticacao.Provider
      value={{
        // Português
        usuario,
        definirUsuario,
        alternarPerfil,
        // Inglês
        user: usuario,
        setUser: definirUsuario,
        switchRole: alternarPerfil,
        // Perfil em Inglês
        role: usuario?.perfil ?? null,
      }}
    >
      {children}
    </ContextoAutenticacao.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const usarAutenticacao = () => {
  const contexto = useContext(ContextoAutenticacao);
  if (contexto === undefined) {
    throw new Error('usarAutenticacao deve ser usado dentro de um ProvedorAutenticacao');
  }
  return contexto;
};

// Alias para compatibilizar com imports em Inglês
export const AuthProvider = ProvedorAutenticacao;
export const useAuth = usarAutenticacao;

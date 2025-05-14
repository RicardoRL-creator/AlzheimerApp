import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Relationship, RelationshipStatus } from '../types';

// Interface com os métodos e propriedades do contexto
interface RelationshipContextType {
  // Lista de relacionamentos entre cuidadores e pessoas assistidas
  relationships: Relationship[];
  // Solicita vínculo com pessoa assistida pelo ID
  requestLink: (assistedId: string) => void;
  // Aprova uma solicitação de vínculo existente
  approveLink: (id: string) => void;
  // Rejeita uma solicitação de vínculo existente
  rejectLink: (id: string) => void;
}

// Contexto para gerenciar vínculos entre cuidadores e pessoas assistidas
const RelationshipContext = createContext<RelationshipContextType | undefined>(undefined);

// Provider para disponibilizar funções de gestão de relacionamentos
export const RelationshipProvider = ({ children }: { children: ReactNode }) => {
  // Acesso ao usuário atual para identificar quem está fazendo a solicitação
  const { user } = useAuth();
  // Estado para armazenar todos os relacionamentos
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  // Cria uma nova solicitação de vínculo para uma pessoa assistida
  const requestLink = (assistedId: string) => {
    if (!user) return;
    const newRel: Relationship = {
      id: String(Date.now()),
      caregiverId: user.id,
      assistedId,
      status: 'pending',
    };
    setRelationships((prev) => [...prev, newRel]);
  };

  // Aprova uma solicitação de vínculo pendente
  const approveLink = (id: string) => {
    setRelationships((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
  };

  // Rejeita uma solicitação de vínculo pendente
  const rejectLink = (id: string) => {
    setRelationships((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
  };

  return (
    <RelationshipContext.Provider
      value={{ relationships, requestLink, approveLink, rejectLink }}
    >
      {children}
    </RelationshipContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de relacionamentos
export const useRelationship = () => {
  const context = useContext(RelationshipContext);
  if (!context) {
    throw new Error('useRelationship deve ser usado dentro de RelationshipProvider');
  }
  return context;
};

// Definições de tipo globais ou compartilhadas
// Exemplo:
// export interface UserProfile {
//   id: string;
//   username: string;
//   email: string;
//   // outros campos do perfil
// }

// export interface LocationData {
//   latitude: number;
//   longitude: number;
//   timestamp: number;
// }

export interface SafeZone {
  id: string;
  latitude: number;
  longitude: number;
  radius: number; // em metros
}

export interface RouteRecord {
  id: string;
  timestamp: number;
  latitude: number;
  longitude: number;
}

export type RelationshipStatus = 'pending' | 'approved' | 'rejected';
export interface Relationship {
  id: string;
  caregiverId: string;
  assistedId: string;
  status: RelationshipStatus;
}

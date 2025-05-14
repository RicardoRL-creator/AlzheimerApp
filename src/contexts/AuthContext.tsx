// Exemplo de AuthContext
// import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface AuthContextType {
//   user: any; // Defina um tipo apropriado para o usuário
//   login: () => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<any>(null);

//   const login = () => {
//     // Lógica de login com Supabase
//     // setUser(dataFromSupabase);
//     console.log("User logged in");
//   };

//   const logout = () => {
//     // Lógica de logout com Supabase
//     // setUser(null);
//     console.log("User logged out");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

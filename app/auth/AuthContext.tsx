import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getToken, saveToken, removeToken, getUserData, saveUserData, removeUserData } from './sessionService';





// Definimos el tipo de los valores que se manejarán en el contexto
interface AuthContextType {
    userToken: string | null;
    userData: any | null;
    loading: any | null;
    login: (token: string, userData: any) => Promise<void>;
    logout: () => Promise<void>;
    
}

// Creamos el contexto con un valor inicial vacío
const AuthContext = createContext<AuthContextType>({
    userToken: null,
    userData: null,
    loading: null,
    login: async () => { },
    logout: async () => { },
   
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const token = await getToken();
            const userData = await getUserData();
            console.log('Token recuperado:', token);
            console.log('userData recuperado:', userData);
            if (token && userData) {
                setUserToken(token);
                setUserData(userData);
            }
           
        };
        loadSession();
    }, []);

    const login = async (token: string, userData: any) => {
        setUserToken(token);
        setUserData(userData);
        await saveToken(token);
        await saveUserData(userData);
    };

    const logout = async () => {
        setUserToken(null);
        setUserData(null);
        await removeToken();
        await removeUserData();
       
    };
  

    return (
        <AuthContext.Provider value={{ userToken, userData, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

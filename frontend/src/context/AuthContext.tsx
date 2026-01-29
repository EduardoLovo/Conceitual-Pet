import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';

// Tipagem do usuário (ajuste conforme o que seu backend retorna)
interface User {
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (userData: User, token: string) => void;
    signOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Ao carregar a página, verifica se já tem login salvo
    useEffect(() => {
        const storagedUser = localStorage.getItem('@ConceitualPet:user');
        const storagedToken = localStorage.getItem('@ConceitualPet:token');

        if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
        }
    }, []);

    const signIn = (userData: User, token: string) => {
        setUser(userData);
        // Salva no LocalStorage para persistir o login
        localStorage.setItem('@ConceitualPet:user', JSON.stringify(userData));
        localStorage.setItem('@ConceitualPet:token', token);
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('@ConceitualPet:user');
        localStorage.removeItem('@ConceitualPet:token');
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);

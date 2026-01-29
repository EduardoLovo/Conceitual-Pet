import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import type { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
    roles?: string[]; // Lista de cargos permitidos (ex: ['ADMIN', 'DEV'])
}

interface CustomTokenPayload {
    role: string;
    exp: number; // Data de expiração
    // adicione outros campos se precisar
}

export function PrivateRoute({ children, roles }: PrivateRouteProps) {
    const token = localStorage.getItem('conceitualpet_token');

    // 1. Se não tem token, tchau! 👋
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode<CustomTokenPayload>(token);

        // 2. Opcional: Verificar se o token expirou
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem('conceitualpet_token');
            alert('Sua sessão expirou. Faça login novamente.');
            return <Navigate to="/login" replace />;
        }

        // 3. Se a rota exige um cargo específico (ex: ADMIN) e o usuário não tem
        if (roles && !roles.includes(decoded.role)) {
            alert('Você não tem permissão para acessar esta página.');
            return <Navigate to="/" replace />; // Manda pra Home
        }

        // 4. Se passou por tudo, mostra a página!
        return children;
    } catch (error) {
        // Se o token for inválido/corrompido
        localStorage.removeItem('conceitualpet_token');
        return <Navigate to="/login" replace />;
    }
}

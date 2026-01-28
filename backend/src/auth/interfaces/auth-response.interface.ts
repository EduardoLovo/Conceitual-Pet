import { Role } from '@prisma/client';

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        role: Role;
    };
}
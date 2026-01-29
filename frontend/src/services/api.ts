import axios from 'axios';

const api = axios.create({
    // Lembre-se: O backend está na porta 3000 e definimos o prefixo /api
    baseURL: 'http://localhost:3000/api',
});

// --- INTERCEPTADOR MÁGICO ---
// Antes de toda requisição sair do frontend, o Axios vai rodar essa função.
// Ela verifica se tem um token salvo e coloca no cabeçalho.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('conceitualpet_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;

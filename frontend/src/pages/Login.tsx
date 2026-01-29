import { useState } from 'react';
import api from '../services/api'; // Importamos nossa configuração
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    // Estados para guardar o que o usuário digita
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault(); // Evita que a página recarregue
        setError(''); // Limpa erros anteriores

        try {
            // Chama o backend
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            // Se chegou aqui, deu sucesso!
            const { access_token } = response.data;

            // 1. Salva o token no navegador
            localStorage.setItem('conceitualpet_token', access_token);

            // 2. Redireciona para a Home (ou Dashboard)
            alert('Login realizado com sucesso!'); // Temporário
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Email ou senha incorretos!');
        }
    }

    return (
        <div className="p-8 flex justify-center items-center min-h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

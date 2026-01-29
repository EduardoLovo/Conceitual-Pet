import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from 'react-router-dom'; // Para redirecionar
import api from '../services/api';
import { useAuth } from '../context/AuthContext'; // Nosso hook novo

const Login = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { signIn } = useAuth(); // Função global de login
    const navigate = useNavigate(); // Função de redirecionamento

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Validando...');

        if (!executeRecaptcha) {
            setStatus('Erro: Recaptcha não carregado.');
            return;
        }

        try {
            const tokenRecaptcha = await executeRecaptcha('login');

            // Faz a requisição ao Backend
            const response = await api.post(
                '/auth/login',
                { email, password },
                { headers: { 'recaptcha-token': tokenRecaptcha } },
            );

            // Sucesso!
            console.log('Dados do Backend:', response.data);

            // 1. Salva os dados no Contexto (Global)
            // Ajuste 'response.data.user' e 'response.data.access_token' conforme seu backend retorna
            const userBackend = response.data.user || { email: email };
            const tokenBackend = response.data.access_token || 'token-exemplo';

            signIn(userBackend, tokenBackend);

            // 2. Redireciona para a Home
            navigate('/');
        } catch (error: any) {
            console.error(error);
            if (error.response?.status === 403) {
                setStatus('Bloqueado: Verificação de segurança falhou 🤖');
            } else if (error.response?.status === 401) {
                setStatus('Email ou senha inválidos.');
            } else {
                setStatus('Erro no servidor.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Login Conceitual Pet 🐶</h2>
            <form
                onSubmit={handleLogin}
                style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
                    Entrar
                </button>
            </form>
            {status && <p style={{ color: 'red', marginTop: '10px' }}>{status}</p>}
        </div>
    );
};

export default Login;

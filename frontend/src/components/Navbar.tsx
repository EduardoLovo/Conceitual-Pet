import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, signOut, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate('/login'); // Manda de volta pro login ao sair
    };

    return (
        <nav
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '1rem 2rem',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #ddd',
            }}
        >
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
                    Conceitual Pet 🐾
                </Link>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
                <Link to="/">Home</Link>
                <Link to="/produtos">Camas</Link>

                {/* LÓGICA DE TROCA DE BOTÕES */}
                {isAuthenticated ? (
                    // Se estiver logado: Mostra "Sair" e talvez o nome
                    <>
                        <span>Olá, {user?.name || user?.email}</span>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    // Se NÃO estiver logado: Mostra Login / Registro
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Cadastrar</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

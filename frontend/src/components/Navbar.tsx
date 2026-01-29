import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();
    // Verifica se tem token para mudar o botão de Login para Logout (Opcional, mas recomendado)
    const token = localStorage.getItem('conceitualpet_token');

    function handleLogout() {
        localStorage.removeItem('conceitualpet_token');
        navigate('/login');
    }

    return (
        <nav className="bg-gray-800 p-4 text-white flex gap-4 justify-between items-center">
            <div className="flex gap-4">
                <Link to="/" className="font-bold text-xl">
                    🐾 ConceitualPet
                </Link>
                <Link to="/" className="hover:text-gray-300 self-center">
                    Home
                </Link>
            </div>

            <div className="flex gap-4 items-center">
                {/* Podemos deixar o botão Admin visível ou esconder com lógica depois */}
                <Link to="/admin" className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm">
                    Admin
                </Link>

                {token ? (
                    <button
                        onClick={handleLogout}
                        className="hover:text-gray-300 self-center cursor-pointer"
                    >
                        Sair
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-gray-300 self-center">
                            Login
                        </Link>
                        <Link to="/register" className="hover:text-gray-300 self-center">
                            Cadastro
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

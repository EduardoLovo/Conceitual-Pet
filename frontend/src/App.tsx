import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { MeusPedidos } from './pages/MeusPedidos';

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Rotas Públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* --- ROTA PROTEGIDA --- */}
                {/* Apenas ADMIN e DEV podem entrar aqui */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute roles={['ADMIN', 'DEV']}>
                            <Admin />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/meus-pedidos"
                    element={
                        <PrivateRoute>
                            <MeusPedidos />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;

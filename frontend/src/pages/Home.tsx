import { useEffect, useState } from 'react';
import api from '../services/api';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

export function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Estamos buscando TODOS. Se quiser só os destaques, use '/products/featured'
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos', error);
                alert('Erro ao carregar produtos do servidor.');
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []); // O array vazio [] faz rodar apenas 1 vez quando a tela abre

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Principal (Hero Section) */}
            <div className="bg-primary py-20 text-center text-white">
                <h1 className="text-4xl font-bold mb-4">O Melhor Conforto para seu Pet</h1>
                <p className="text-lg opacity-90">
                    Camas ortopédicas e personalizadas de alta qualidade.
                </p>
            </div>

            {/* Lista de Produtos */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">
                    Nossos Produtos
                </h2>

                {loading ? (
                    <p className="text-center text-gray-500">Carregando camas...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-xl">Nenhum produto cadastrado ainda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

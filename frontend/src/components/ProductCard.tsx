import type { Product } from '../types/Product';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Função para formatar dinheiro (R$)
    const priceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(product.price));

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Imagem (ou Placeholder se não tiver imagem) */}
            <div className="h-48 bg-gray-200 w-full overflow-hidden">
                <img
                    src={product.mainImage || 'https://via.placeholder.com/400x300?text=Sem+Imagem'}
                    alt={product.description}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4">
                {/* Nome do Modelo (Transformando "KING_SIZE" em "King Size") */}
                <h3 className="text-sm text-gray-500 font-semibold tracking-wide uppercase">
                    {product.model.replace('_', ' ')}
                </h3>

                <h2 className="text-lg font-bold text-gray-900 mt-1 truncate">
                    {product.description}
                </h2>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{priceFormatted}</span>

                    <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-indigo-700 transition">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    );
}

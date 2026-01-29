export function MeusPedidos() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">
                    📦 Meus Pedidos
                </h1>

                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="text-6xl mb-4">🛒</div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Você ainda não fez nenhum pedido
                    </h2>
                    <p className="text-gray-500">
                        Explore nossa loja e encontre o melhor para o seu pet!
                    </p>
                </div>
            </div>
        </div>
    );
}

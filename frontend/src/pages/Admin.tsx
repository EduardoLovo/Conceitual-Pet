import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

// Enums iguais aos do Backend (Prisma)
const BED_MODELS = ['IGLOO', 'MATTRESS', 'ORTHOPEDIC', 'SOFA_BED'];
const SIZES = ['SMALL', 'MEDIUM', 'LARGE', 'EXTRA_LARGE'];

export function Admin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        model: 'IGLOO',
        description: '',
        price: '',
        color: '',
        size: 'MEDIUM',
        stock: 10,
        mainImage: '',
        isFeatured: false,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await api.post('/products', {
                ...formData,
                price: Number(formData.price), // Converte string para numero
                stock: Number(formData.stock),
            });

            alert('Produto cadastrado com sucesso!');
            navigate('/'); // Volta para a home
        } catch (error: any) {
            console.error(error);
            if (error.response?.status === 403) {
                alert('ERRO: Você não tem permissão de ADMIN para isso!');
            } else {
                alert('Erro ao cadastrar produto. Verifique os dados.');
            }
        }
    }

    // Função genérica para atualizar os campos
    function handleChange(e: any) {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
                    ⚙️ Painel Admin - Novo Produto
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    {/* Modelo */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Modelo</label>
                        <select
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full border p-3 rounded bg-gray-50"
                        >
                            {BED_MODELS.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">
                            Descrição / Nome
                        </label>
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Ex: Cama Iglu Conforto Azul"
                            className="w-full border p-3 rounded"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Preço */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Preço (R$)</label>
                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>

                        {/* Estoque */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Estoque</label>
                            <input
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Cor */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Cor</label>
                            <input
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                placeholder="Ex: Azul Marinho"
                                className="w-full border p-3 rounded"
                                required
                            />
                        </div>

                        {/* Tamanho */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Tamanho</label>
                            <select
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="w-full border p-3 rounded bg-gray-50"
                            >
                                {SIZES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Imagem (URL) */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">URL da Imagem</label>
                        <input
                            name="mainImage"
                            value={formData.mainImage}
                            onChange={handleChange}
                            placeholder="https://site.com/imagem.jpg"
                            className="w-full border p-3 rounded"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Copie o endereço de uma imagem da internet e cole aqui.
                        </p>
                    </div>

                    {/* Destaque */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            className="w-5 h-5 accent-primary"
                        />
                        <label className="text-gray-700 font-bold">Produto em Destaque?</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        Cadastrar Produto
                    </button>
                </form>
            </div>
        </div>
    );
}

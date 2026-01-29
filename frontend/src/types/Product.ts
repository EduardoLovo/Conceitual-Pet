export interface Product {
    id: number;
    model: string; // BedModels (Enum no back, string aqui)
    description: string;
    price: string; // O Prisma retorna Decimal como string as vezes, ou number
    mainImage?: string;
    isFeatured: boolean;
}

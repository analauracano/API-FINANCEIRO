import { type Category, TransactionType } from "@prisma/client";
import prisma from "../config/prisma";

type GlobalCategoryInput = Pick<Category, 'name' | 'color' | 'type'>;

// Lista de categorias globais
const globalCategories: GlobalCategoryInput[] = [
// Despesas
{ name: 'Alimentação', color: '#FF5733', type: TransactionType.expense},
{ name: 'Transporte', color: '#33ABFF', type: TransactionType.expense},
{ name: 'Moradia', color: '#FF33A1', type: TransactionType.expense},
{ name: 'Saúde', color: '#33FF57', type: TransactionType.expense},
{ name: 'Educação', color: '#FF8C33', type: TransactionType.expense},
{ name: 'Lazer', color: '#8C33FF', type: TransactionType.expense},
{ name: 'Compras', color: '#33FFF5', type: TransactionType.expense},
{ name: 'Outros', color: '#33FF8C', type: TransactionType.expense},

// Receitas
{ name: 'Salário', color: '#FF5733', type: TransactionType.income},
{ name: 'Freelance', color: '#33ABFF', type: TransactionType.income},
{ name: 'Investimentos', color: '#FF33A1', type: TransactionType.income},
{ name: 'Outros', color: '#8C33FF', type: TransactionType.income}
];

export const initializeGlobalCategories = async(): Promise<Category[]> => {
    const createdCategories: Category[] = [];
    for(const category of globalCategories){
        try {
            const existing = await prisma.category.findFirst({
                where: {
                    name: category.name,
                    type: category.type
                }
            })

            if(!existing){
                const newCategory = await prisma.category.create({ data: category });
                console.log(`✅ Criada ${newCategory.name}`);
                createdCategories.push(newCategory);
            } else{
                createdCategories.push(existing);
            }
        } catch {
            console.error('❌ Erro ao criar categoria');
        }
    }

     console.log('✅ Todas as categorias inicializadas com sucesso.');
    return createdCategories;
}
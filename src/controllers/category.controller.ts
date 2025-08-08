import type { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../config/prisma';

export const getCategories = async(request: FastifyRequest, reply: FastifyReply,): Promise<void> => {

    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc'},
        });

        reply.send(categories);
    } catch(err){
        request.log.error('Erro ao buscar categories', err)
        repply.status(500).send({error: 'Erro ao buscar categorias'})
    }
}
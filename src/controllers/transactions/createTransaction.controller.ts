import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";

const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    const userId = "anaLaura"; // camelCase

    if (!userId) {
        reply.status(401).send({ error: "Usuário não autenticado" });
        return;
    }

    const validationResult = createTransactionSchema.safeParse(request.body);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.issues[0]?.message || "Validação inválida";
        reply.status(400).send({ error: errorMessage });
        return;
    }

    const transactionData = validationResult.data;

    try {
        const category = await prisma.category.findFirst({
            where: {
                id: transactionData.categoryId,
                type: transactionData.type,
            },
        });

        if (!category) {
            reply.status(400).send({ error: "Categoria inválida" });
            return;
        }

        const parsedDate = new Date(transactionData.date);

        const newTransaction = await prisma.transaction.create({
            data: {
                ...transactionData,
                userId,
                date: parsedDate,
            },
            include: {
                category: true,
            },
        });

        reply.status(201).send(newTransaction);
    } catch (error) {
        request.log.error("Erro ao criar transação", error);
        reply.status(500).send({ error: "Erro interno do servidor ao criar transação" });
    }
};

export default createTransaction;

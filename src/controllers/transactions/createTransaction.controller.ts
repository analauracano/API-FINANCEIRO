import type { FastifyReply, FastifyRequest } from 'fastify';
import type { z } from 'zod';
import type { createTransactionSchema } from '../../schemas/transaction.schema';
import prisma from '../../config/prisma';

const createTransaction = async (
  request: FastifyRequest <{ Body: z.infer<typeof createTransactionSchema> }>,
  reply: FastifyReply
): Promise<void> => {
  const userId = 'ANALAURA';

  if (!userId) {
    reply.status(401).send({ error: 'Usuário não autenticado' });
    return;
  }

  const transaction = request.body;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      reply.status(400).send({ error: 'Categoria inválida' });
      return;
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error('Erro ao criar transação', err);
    reply.status(500).send({ error: 'Erro interno do servidor ao criar transação' });
  }
};

export default createTransaction;

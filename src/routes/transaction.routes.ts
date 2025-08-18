import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema, deleteTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
// criação
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

// Buscar com Filtros
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema)
    },
    handler: getTransactions,
  });

// Buscar o resumo / summary
fastify.route({
  method: 'GET',
  url: '/summary',
  schema: {
    querystring: zodToJsonSchema(getTransactionsSummarySchema)
  },
  handler: getTransactionsSummary
});

// Deletar 
fastify.route({
  method: 'DELETE',
  url: '/:id',
  schema: {
    params: zodToJsonSchema(deleteTransactionSchema),
  },
  handler: deleteTransaction,
});
};

export default transactionRoutes;

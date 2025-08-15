import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";

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
};

export default transactionRoutes;

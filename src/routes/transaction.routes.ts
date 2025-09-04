import type { FastifyInstance } from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionsSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";

const transactionRoutes = async (fastify: FastifyInstance) => {
  // Configura Zod como validador e serializador
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  // Criação
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: createTransactionSchema,
    },
    handler: createTransaction,
  });

  // Buscar com filtros
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: getTransactionsSchema,
    },
    handler: getTransactions,
  });

  // Buscar o resumo / summary
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: getTransactionsSummarySchema,
    },
    handler: getTransactionsSummary,
  });

  // Deletar
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: deleteTransactionSchema,
    },
    handler: deleteTransaction,
  });
};

export default transactionRoutes;

import { api } from "@/config/axios-config.ts"
import type { Transaction } from "@/features/transactions/types.ts"

const ENDPOINT = "/api/v1/transactions"

export const transactionService = {
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>(ENDPOINT)
    return response.data
  },

  createTransaction: async (transaction: Transaction): Promise<Transaction> => {
    const response = await api.post<Transaction>(ENDPOINT, transaction)
    return response.data
  },
}

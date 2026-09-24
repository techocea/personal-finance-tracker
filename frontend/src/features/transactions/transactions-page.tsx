import TransactionForm from "@/features/transactions/transaction-form.tsx"
import type { Transaction } from "@/features/transactions/types.ts"
import { transactionService } from "@/features/transactions/transaction-service.ts"
import { useEffect, useState } from "react"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const handleAddTransaction = (newTx: Transaction) => {
    transactionService
      .createTransaction(newTx)
      .then((savedTx) => {
        setTransactions((prev) => [savedTx, ...prev])
      })
      .catch((err) => {
        console.error(err)
        alert("Could not save the record")
      })
  }

  useEffect(() => {
    transactionService
      .getAllTransactions()
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Caught network error safely:", err)
        setError("Could not load data from the server profile.")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading application data...</p>

  return (
    <div className="space-y-4">
      <h2>Transactions</h2>
      <TransactionForm onTransactionAdd={handleAddTransaction} />

      {/*{error && <p className="text-red-400">{error}</p>}*/}

      <h1>Transaction Records</h1>
      {transactions.length === 0 ? (
        <p>No records yet...</p>
      ) : (
        <ul>
          {transactions.map((tx) => {
            const colorMap: Record<string, string> = {
              income: "text-green-500",
              expense: "text-red-500",
              savings: "text-blue-500",
            }

            const signMap: Record<string, string> = {
              income: "+",
              expense: "-",
              savings: "➡️",
            }

            // 2. Safe mapping extraction using the lowercase type directly
            const currentType = tx.type || "expense"
            const colorClass = colorMap[currentType] || "text-gray-500"
            const sign = signMap[currentType] || ""

            const cleanAmount =
              typeof tx.amount === "number"
                ? tx.amount
                : parseFloat(tx.amount || "0") || 0

            // 3. 🛡️ Safe Date Formatting: Extract just the YYYY-MM-DD string part
            const displayDate = tx.date
              ? String(tx.date).split("T")[0]
              : "No Date"

            return (
              <li
                key={tx.id}
                className="flex items-center justify-between border-b border-gray-100 py-3"
              >
                <div>
                  {/* Render the string item index [0] instead of the whole array object */}
                  <span className="mr-3 font-mono text-sm text-gray-400">
                    {displayDate}
                  </span>
                  <span className="font-medium text-gray-800">
                    {tx.description || "Untitled Transaction"}
                  </span>

                  {tx.category && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {tx.category.name}
                    </span>
                  )}
                </div>

                <span className={`font-bold ${colorClass}`}>
                  {sign}\${cleanAmount.toFixed(2)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

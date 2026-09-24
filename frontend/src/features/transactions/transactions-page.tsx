import type { Transaction } from "@/features/transactions/types.ts"
import { transactionService } from "@/features/transactions/transaction-service.ts"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CreateTransaction from "@/features/transactions/components/create-transaction.tsx"

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
      <div className="flex w-full items-center justify-between">
        <h1>Transaction Records</h1>
        <CreateTransaction onTransactionAdd={handleAddTransaction}/>
      </div>

      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium capitalize">
                {transaction.description}
              </TableCell>
              <TableCell>{transaction.date.split("T")[0]}</TableCell>
              <TableCell>{transaction.type.toUpperCase()}</TableCell>
              <TableCell
                className={`p-4 text-right font-bold ${transaction.type === "income" ? "text-green-600" : transaction.type === "expense" ? "text-red-600" : "text-blue-600"}`}
              >
                Rs {transaction.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>



      {/*{error && <p className="text-red-400">{error}</p>}*/}
    </div>
  )
}

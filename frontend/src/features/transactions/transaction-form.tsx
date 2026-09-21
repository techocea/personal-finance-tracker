import { useState } from "react"
import type { Transaction } from "@/features/transactions/types.ts"

interface TransactionFormProps {
  onTransactionAdd: (transaction: Transaction) => void
}

export default function TransactionForm({
  onTransactionAdd,
}: TransactionFormProps) {
  const [description, setDescription] = useState<string | "">("")
  const [amount, setAmount] = useState<string | "">("")
  const [type, setType] = useState<"income" | "expense" | "savings">("expense")
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!description || !amount) return

    const newTransaction: Transaction = {
      description,
      amount: parseFloat(amount),
      type,
      date,
    }

    onTransactionAdd(newTransaction)

    setDescription('');
    setAmount('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input
        type="text"
        placeholder="Description (e.g., Grocery)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense" | "savings")}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
        <option value="savings">Savings</option>
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  )
}

import { useState } from "react"
import type { Transaction } from "@/features/transactions/types.ts"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"

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

    setDescription("")
    setAmount("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <Input
        type="text"
        placeholder="Description (e.g., Grocery)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
            <SelectItem value="savings">Savings</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Button type="submit" className="col-span-2">
        Add Transaction
      </Button>
    </form>
  )
}

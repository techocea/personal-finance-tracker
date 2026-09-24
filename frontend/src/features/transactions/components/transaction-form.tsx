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
import { transactionService } from "../transaction-service"

interface TransactionFormProps {
  onSaveSuccess: (transaction: Transaction) => void
}

export default function TransactionForm({
  onSaveSuccess,
}: TransactionFormProps) {
  const [description, setDescription] = useState<string | "">("")
  const [amount, setAmount] = useState<string | "">("")
  const [type, setType] = useState<"income" | "expense" | "savings">("expense")
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    if (!description || !amount) return

    const newTx: Transaction = {
      description,
      amount: parseFloat(amount),
      type,
      date,
    }

    try {
      const savedTx = await transactionService.createTransaction(newTx)
      onSaveSuccess(savedTx)
    } catch (err) {
      console.error(err)
      setFormError("Failed to save transaction record. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {formError && (
        <div className="text-sm font-medium text-red-600">{formError}</div>
      )}

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
      <Button type="submit" disabled={isSubmitting} className="col-span-2">
        {isSubmitting ? "Saving..." : "Save Record"}
      </Button>
    </form>
  )
}

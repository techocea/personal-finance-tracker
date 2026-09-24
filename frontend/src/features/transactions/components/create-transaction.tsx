import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import TransactionForm from "@/features/transactions/components/transaction-form.tsx"
import type { Transaction } from "@/features/transactions/types.ts"
import { PlusIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function CreateTransaction({
  onTransactionAdd,
}: {
  onTransactionAdd: (tx: Transaction) => void
}) {
  const handleSuccess = (savedTx: Transaction) => {
    onTransactionAdd(savedTx)
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="default">
            <HugeiconsIcon icon={PlusIcon} /> New Transaction
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <TransactionForm onSaveSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}

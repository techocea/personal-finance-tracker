export interface Transaction {
  id?: 1
  description: string
  amount: number
  type: "income" | "expense" | "savings"
  date: string
  category?:{
    id: number
    name: string
    type: "INCOME" | "EXPENSE"
  }
}

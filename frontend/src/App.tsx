import { BrowserRouter, Link } from 'react-router-dom';
import AppRoutes from "@/routes/app-routes.tsx"

export function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 text-gray-900">
        <nav className="flex gap-6 border-b bg-white p-4 shadow-sm">
          <Link
            to="/dashboard"
            className="font-semibold text-blue-600 hover:underline"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/transactions"
            className="font-semibold text-blue-600 hover:underline"
          >
            💰 Transactions
          </Link>
        </nav>
      </div>

      <main className="container mx-auto p-6">
        <AppRoutes />
      </main>
    </BrowserRouter>
  )
}

export default App

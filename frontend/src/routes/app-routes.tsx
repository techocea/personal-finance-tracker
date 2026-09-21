import { Routes, Route, Navigate } from "react-router-dom"
import DashboardPage from "@/features/dashboard/dashboard-page.tsx"

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<h2>404: Page Not Found</h2>} />
    </Routes>
  )
}
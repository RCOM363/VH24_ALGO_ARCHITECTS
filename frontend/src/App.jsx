import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import DonorDashboard from "./dashboards/DonorDashboard"
import InstituteDashboard from "./dashboards/InstituteDashboard"
import SupplierDashboard from "./dashboards/SupplierDashboard"
import { Sidebar } from "lucide-react"


function App() {
  return (
    <>
      <Routes>
        // Public Routes
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />

        // User Registrations Routes
        <Route path="/donorRegistration" element={<Signup />} />
        <Route path="/instituteRegistration" element={<Signup/>} />
        <Route path="/supplierRegistration" element={<Signup/>} />

        //Private Routes
        <Route path="/donorDashboard" element={<DonorDashboard/>} />
        <Route path="/instituteDashboard" element={<InstituteDashboard/>} />
        <Route path="/supplierDashboard" element={<SupplierDashboard/>} />

        <Route path="/sidebar" element={<Sidebar/>} />
      </Routes>
    </>
  )
}

export default App

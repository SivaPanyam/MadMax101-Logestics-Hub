import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import LiveShipments from "./pages/LiveShipments";
import RiskMonitoring from "./pages/RiskMonitoring";
import RouteOptimization from "./pages/RouteOptimization";
import SimulationMode from "./pages/SimulationMode";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="shipments" element={<LiveShipments />} />
          <Route path="risk" element={<RiskMonitoring />} />
          <Route path="routes" element={<RouteOptimization />} />
          <Route path="simulation" element={<SimulationMode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

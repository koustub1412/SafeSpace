import { Routes, Route } from "react-router-dom";
import RoutePage from "./pages/RoutePage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import SOS from "./pages/SOS";
import MapView from "./pages/MapView";

import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/contacts" 
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/sos" 
        element={
          <ProtectedRoute>
            <SOS />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/map" 
        element={
          <ProtectedRoute>
            <MapView />
          </ProtectedRoute>
        } 
      />
      <Route
  path="/route"
  element={
    <ProtectedRoute>
      <RoutePage />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;

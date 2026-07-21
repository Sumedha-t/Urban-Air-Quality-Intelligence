import { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/Layout/MainLayout';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminMapGIS from './pages/Admin/MapGIS';
import AdminSourceAttribution from './pages/Admin/SourceAttribution';
import AdminForecast from './pages/Admin/Forecast';
import AdminPriorityDashboard from './pages/Admin/PriorityDashboard';

// Citizen Pages
import CitizenDashboard from './pages/Citizen/Dashboard';
import CitizenMapGIS from './pages/Citizen/MapGIS';
import CitizenReportPage from './pages/Citizen/ReportPage';
import CitizenClimateAnalysis from './pages/Citizen/ClimateAnalysis';
import CitizenHealthAssistant from './pages/Citizen/HealthAssistant';

import { getLocations } from './services/api';

// Create global user context
export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);
  const [currentLocationId, setCurrentLocationId] = useState('delhi');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocs = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error("Failed to load locations list", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocs();
  }, []);

  const loginUser = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('role', selectedRole);
  };

  const logoutUser = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  const activeLocation = locations.find(l => l.id === currentLocationId) || locations[0];

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-maroon-800 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-maroon-900 font-medium">Loading Smart Portal Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{
      role, 
      setRole: loginUser,
      logout: logoutUser,
      currentLocationId,
      setCurrentLocationId,
      locations,
      activeLocation
    }}>
      <HashRouter>
        <Routes>
          {/* Guest Route */}
          <Route path="/login" element={!role ? <Login /> : <Navigate to={role === 'admin' ? '/admin' : '/citizen'} replace />} />

          {/* Admin Routes */}
          <Route path="/admin" element={role === 'admin' ? <MainLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<AdminDashboard />} />
            <Route path="map" element={<AdminMapGIS />} />
            <Route path="attribution" element={<AdminSourceAttribution />} />
            <Route path="forecast" element={<AdminForecast />} />
            <Route path="priority" element={<AdminPriorityDashboard />} />
          </Route>

          {/* Citizen Routes */}
          <Route path="/citizen" element={role === 'citizen' ? <MainLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<CitizenDashboard />} />
            <Route path="map" element={<CitizenMapGIS />} />
            <Route path="report" element={<CitizenReportPage />} />
            <Route path="climate" element={<CitizenClimateAnalysis />} />
            <Route path="health" element={<CitizenHealthAssistant />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to={role ? (role === 'admin' ? '/admin' : '/citizen') : '/login'} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import ChallengeCreate from './pages/ChallengeCreate';
import ChallengeView from './pages/ChallengeView';
import Discovery from './pages/Discovery';
import Pilot from './pages/Pilot';
import ScaleUp from './pages/ScaleUp';
import MarketIntelligence from './pages/MarketIntelligence';
import StartupNetwork from './pages/StartupNetwork';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="challenges/new" element={<ChallengeCreate />} />
          <Route path="challenges/:id" element={<ChallengeView />} />
          <Route path="discovery" element={<Discovery />} />
          <Route path="pilot" element={<Pilot />} />
          <Route path="pilot/new" element={<Navigate to="/pilot" replace />} />
          <Route path="scale-up" element={<ScaleUp />} />
          <Route path="market" element={<MarketIntelligence />} />
          <Route path="network" element={<StartupNetwork />} />
          <Route path="procurement" element={<Navigate to="/pilot" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

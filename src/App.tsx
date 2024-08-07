import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/Login';
import { apiService } from './service/apiService';
import { API_URL } from './config';
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import VotePage from './components/page/VotePage';
import SeedPage from './components/page/SeedPage';
import DrawPage from './components/page/DrawPage';
import { UserContext } from './context';
import PairPage from './components/page/PairPage';
import RulesPage from './components/page/RulesPage';
import SchedulePage from './components/page/SchedulePage';

function App() {
  const [user, setUser] = useState<string>();
  const [players, setPlayers] = useState<string[]>([])

  const getPlayers = async () => {
    const result = await apiService.get(`${API_URL}/players`);
    if (result.data) {
      setPlayers(result.data as string[])
    }
  }

  useEffect(() => { getPlayers() }, [])

  return (
    <div className="App">
      <div className="backgroundImage"></div>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/draw" />} />
            <Route path="/vote" element={user ? <VotePage players={players} /> : <Login players={players} setUser={setUser} />} />
            <Route path="/seed" element={<SeedPage />} />
            <Route path="/draw" element={<DrawPage />} />
            <Route path="/pairs" element={<PairPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div >
  );
}

export default App;

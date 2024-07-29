import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/Login';
import { apiService } from './service/apiService';
import { API_URL } from './config';
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import VotePage from './components/page/VotePage';
import SeedPage from './components/page/SeedPage';
import DrawPage from './components/page/DrawPage';

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
      {players && !user && <Login players={players} setUser={setUser}></Login>}
      {players && user &&
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/vote" />} />
            <Route path="/vote" element={<VotePage players={players} user={user} />} />
            <Route path="/seed" element={<SeedPage />} />
            <Route path="/draw" element={<DrawPage />} />
          </Routes>
        </BrowserRouter>

      }
    </div >
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import AddBill from './pages/bill/AddBill';
import AddFriends from './pages/addfriends/AddFriends';
import Shares from './pages/shares/Shares';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bill" element={<AddBill />} />
        <Route path="/bill/friends" element={<AddFriends />} />
        <Route path="/bill/shares" element={<Shares/>} />
      </Routes>
    </Router>
  );
}

export default App;

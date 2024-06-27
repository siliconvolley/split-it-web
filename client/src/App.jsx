import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import AddBill from './pages/bill/AddBill';
import AddFriends from './pages/addfriends/AddFriends';
import BillSplit from './pages/split/BillSplit';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bill" element={<AddBill />} />
        <Route path="/bill/friends" element={<AddFriends />} />
        <Route path="bill/split" element={<BillSplit/>} />
      </Routes>
    </Router>
  );
}

export default App;

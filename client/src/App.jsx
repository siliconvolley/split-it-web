import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import AddBill from './pages/bill/AddBill';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/bill' element={<AddBill/>} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cart from "./Pages/Cart"
import Login from "./Pages/Login"
import Shipping from "./Pages/Shipping"
import Index from "./Pages/Index"
import Signup from "./Pages/Signup"
import History from './Pages/History';
import "./App.css"
function App() {
  return (
    <div className='main-back'>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Index />} />
          <Route
            path="/cart"
            element={<Cart />} />
          <Route
            path="/shipping"
            element={<Shipping />} />
          <Route
            path="/login"
            element={<Login />} />
          <Route
            path="/"
            element={<Login />} />
          <Route
            path="/signup"
            element={<Signup />} />
          <Route
            path='/history'
            element={<History/>}
          />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;

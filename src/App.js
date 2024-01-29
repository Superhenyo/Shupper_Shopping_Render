import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
import AppNavBar from './components/AppNavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css'

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Product';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
import ProductView from './pages/ProductView';
import Users from './pages/Users'



function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })
  const unsetUser = () => {
    localStorage.clear()
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin
          });
        } else {
          setUser({
            id: null,
            isAdmin: null
          });
        }
      })
  }, [])

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/products/:productId" element={<ProductView />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;

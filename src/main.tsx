import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Search from './component/Search.tsx'

import { BrowserRouter, Routes, Route, Link, Outlet,NavLink  } from 'react-router-dom';
import { store } from './state/Store.ts';
import { Provider } from 'react-redux';



  const navLinkStyles = ({ isActive}:any) => ({
    color: isActive ? '#007bff' : '#333',
    textDecoration: isActive ? 'none' : 'underline',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '5px 10px'
  });
createRoot(document.getElementById('root')!).render(
  <StrictMode>
<Provider store={store}>
<BrowserRouter>
<nav>
    <NavLink to="/" className={({isActive})=>(isActive? "active": "")}>Home</NavLink> | {" "}
    <NavLink to="/Search" className={({isActive})=>(isActive? "active": "")}>Search</NavLink> | {" "}
    
</nav>
  <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Search" element={<Search />} />
  </Routes>
</BrowserRouter>
</Provider>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route, Link, Outlet,NavLink  } from 'react-router-dom';
import { store } from './state/Store.ts';
import { Provider } from 'react-redux';
import Login from './component/Login/Login.tsx';
import Todo from './component/Todo/Todo.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<Provider store={store}>
<BrowserRouter>
  <Routes>
        <Route path="/" element={<App />} />
  </Routes>
</BrowserRouter>
</Provider>
  </StrictMode>
)

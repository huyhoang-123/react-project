import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store/Store.ts';
import { Provider } from 'react-redux';
import LoginScreen from './pages/LoginScreen.tsx';
import RegisterScreen from './pages/RegisterScreen.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './themes/Theme.ts';
import TodoListScreen from './pages/TodoListScreen.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/todo" element={<TodoListScreen />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

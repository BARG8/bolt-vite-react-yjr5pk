import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import StoreHome from './pages/StoreHome';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyCardsPage from './pages/MyCardsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Toaster position="top-center" />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/notifications" element={
                  <>
                    <main className="container mx-auto pt-16 pb-20">
                      <NotificationsPage />
                    </main>
                    <Navbar />
                  </>
                } />
                <Route path="/favorites" element={
                  <>
                    <main className="container mx-auto pt-16 pb-20">
                      <FavoritesPage />
                    </main>
                    <Navbar />
                  </>
                } />
                <Route path="/my-cards" element={
                  <>
                    <main className="container mx-auto pt-16 pb-20">
                      <MyCardsPage />
                    </main>
                    <Navbar />
                  </>
                } />
                <Route
                  path="/"
                  element={
                    <>
                      <main className="container mx-auto px-4">
                        <HomePage />
                      </main>
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <>
                      <main className="container mx-auto px-4 pt-16 pb-20">
                        <ProductDetail />
                      </main>
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="/store/:id"
                  element={
                    <>
                      <main className="container mx-auto px-4 pt-16 pb-20">
                        <StoreHome />
                      </main>
                      <Navbar />
                    </>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <>
                      <main className="container mx-auto px-4 pt-16 pb-20">
                        <ProfilePage />
                      </main>
                      <Navbar />
                    </>
                  }
                />
              </Routes>
            </div>
          </Router>
        </NotificationProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
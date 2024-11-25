import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Biography from './components/Biography';
import './App.css';

function App() {
    return (
        <Router>
            <div className="content-wrapper">
                <Header />
                <main id="container">
                    <Navigation />
                    <Routes>
                        {/* Главная страница */}
                        <Route path="/" element={<MainContent />} />

                        {/* Страница биографии */}
                        <Route path="/about" element={<Biography />} />

                        {/* Другие возможные страницы */}
                        {/* <Route path="/contact" element={<Contact />} /> */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

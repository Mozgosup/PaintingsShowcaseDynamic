import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Biography from './components/Biography';
import './App.css';
import LanguageSwitcher from "./components/LanguageSwitcher";
import Contact from "./components/Contact";

function App() {
    return (
        <Router>
            <div className="content-wrapper">
                <Header/>
                <main id="container">
                    <div className="lang-switcher-container">
                        <LanguageSwitcher/>
                    </div>
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={<MainContent/>}/>
                        <Route path="/about" element={<Biography/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;

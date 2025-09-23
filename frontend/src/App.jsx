import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import Biography from './components/Biography';
import './App.css';
import LanguageSwitcher from "./components/LanguageSwitcher";
import Contact from "./components/Contact";

function App() {

    const {i18n} = useTranslation();

    useEffect(() => {
        document.documentElement.lang = i18n.language || 'en';
    }, [i18n.language]);

    return (
        <Router>
            <div className="content-wrapper">
                <Header/>
                <main id="container">
                    <aside id="menu">
                        <Navigation />
                    </aside>

                    <div className="menu-separator" aria-hidden="true" />

                    <section id="content">
                        <div className="lang-switcher-container">
                            <LanguageSwitcher />
                        </div>

                        <Routes>
                            <Route path="/" element={<MainContent />} />
                            <Route path="/about" element={<Biography />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </section>
                </main>

                <Footer/>
            </div>
        </Router>
    );
}

export default App;

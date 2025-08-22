// App.js
import React, { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Navbar from "./components/Navbar";

import SplashScreen from "./components/SplashScreen";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <Navbar showSplash={showSplash} />
      <div className="background">
        {/* All your sections mount here */}
        <Hero startTyping={!showSplash} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact /> 
      </div>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
    </>
  );
}

export default App;

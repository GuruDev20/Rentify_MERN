import React from 'react'
import './Styles/App.css'
import {Routes,Route} from 'react-router-dom'
import Welcome from './Components/Welcome';
function App() {
    window.addEventListener("scroll", reveal);
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        var rev = document.querySelectorAll(".rev");
        var revv = document.querySelectorAll(".revv");
        for (var i = 0; i < reveals.length; i++) {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 100;
            if (reveals[i] && revealtop < windowheight - revealpoint) {
                reveals[i].classList.add("active");
            } else if (reveals[i]) {
                reveals[i].classList.remove("active");
            }
            if (rev[i] && revv[i] && revealtop < windowheight - revealpoint) {
                rev[i].classList.add("active");
                revv[i].classList.add("active");
            } else if (rev[i] && revv[i]) {
                rev[i].classList.remove("active");
                revv[i].classList.remove("active");
            }
        }
    }
    return (
        <Routes>
            <Route path='/' element={<Welcome/>}/>
        </Routes>
    )
}

export default App
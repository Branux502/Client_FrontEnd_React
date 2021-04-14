import React from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar(){
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav">
            
            <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>
            <li class="nav-item"><Link to="/Student" class="nav-link">Student</Link></li>
            <li class="nav-item"><Link to="/Teacher" class="nav-link">Teacher</Link></li>
            
        </ul>
        </nav>
    );
}

export default NavBar;
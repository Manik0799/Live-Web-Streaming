import React from "react";
import {Link} from "react-router-dom"

import GoogleAuth from "./googleAuth";

function Header(){
    return(
        <div className= "ui container">
            <div className = "ui secondary pointing menu">
                <Link to="/" className= "item">
                    Streamify
                </Link>
                <div className= "right menu">
                    <Link to="/" className= "item">All Streams</Link>
                </div>
                <div className= "right item">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    )
}

export default Header;
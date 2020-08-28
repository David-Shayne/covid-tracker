import React, { Component } from "react";
import logo from "../img/logo.png";
import "../css/Header.css";

export class Header extends Component {
    render() {
        return (
            <div className="header">
                <img
                    src={logo}
                    style={{ height: "10em" }}
                    className="logo"
                    alt="covid-19"
                />
                <a href="https://sacoronavirus.co.za/" className="black-text">
                    Find out more info - South Africa
                </a>
            </div>
        );
    }
}

export default Header;

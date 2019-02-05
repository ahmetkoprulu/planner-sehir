import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark material-black justify-content-between">
                <div className="container">
                    <a className="navbar-brand nav-link" href="/">Planner Sehir</a>
                    <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                        <li class="nav-item">
                            <a className="text-light" href="https://github.com/ahmetkoprulu/">
                                <i className="fab fa-github fa-lg"></i>
                            </a>
                        </li>
                        <li class="nav-item ml-2">
                            <a className="text-light" href="https://www.linkedin.com/in/ahmetkoprulu/">
                                <i className="fab fa-linkedin-in fa-lg"> </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="page-footer p-5 bg-black text-white">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <div className="footer-left">
                        <h3>Лучшая шаурма в мире</h3>
                        <p>+7(800)555-35-35</p>
                        <br/>
                        <p>С 08:00 до 20:00 без обедов и выходных</p>
                    </div>
                    <div className="footer-right">
                        <h3>Социальные сети</h3>
                        <a href="https://www.linkedin.com/in/v.c.charkin/">
                            <i className="fab fa-linkedin fa-2x mr-3" style={{color: 'white'}}></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-facebook-f fa-2x mr-3" style={{color: 'white'}}></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-twitter fa-2x mr-3" style={{color: 'white'}}></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <section className="social-links mb-4">
                    <a href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
                    <a href="#!" role="button"><i className="fab fa-twitter"></i></a>
                    <a href="#!" role="button"><i className="fab fa-google"></i></a>
                    <a href="#!" role="button"><i className="fab fa-instagram"></i></a>
                    <a href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#!" role="button"><i className="fab fa-github"></i></a>
                </section>
                <div className="copyright">
                    © {new Date().getFullYear()} Copyright:
                    <a href="https://github.com/Dpjrczz03">Dpjrczz03</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
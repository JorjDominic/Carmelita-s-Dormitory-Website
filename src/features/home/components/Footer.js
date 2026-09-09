import Brand from '../../../shared/components/Brand';

function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Brand /><p>A warm place to live,<br />managed with care.</p></div><div className="footer-links"><div><b>Explore</b><a href="#about">About us</a><a href="#rooms">Rooms</a><a href="#amenities">Amenities</a></div><div><b>Connect</b><a href="#contact">Contact us</a><a href="#gallery">Instagram</a><a href="#contact">Facebook</a></div></div><a className="back-top" href="#home">Back to top <span>↑</span></a></div><div className="footer-bottom"><span>© 2024 Carmelita’s Dormitory. All rights reserved.</span><span>A little closer to home.</span></div></footer>;
}

export default Footer;

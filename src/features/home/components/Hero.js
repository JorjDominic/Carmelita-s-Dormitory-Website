import ArrowIcon from '../../../shared/components/ArrowIcon';

function Hero({ onInquire }) {
  return <section className="hero" id="home"><div className="hero-image" /><div className="hero-content"><p className="eyebrow light">A warm place to call home</p><h1>Life feels a little<br /><em>better</em> here.</h1><p className="hero-copy">A welcoming dormitory in the heart of the city, thoughtfully made for students and young professionals.</p><div className="hero-actions"><button className="button button-light" onClick={onInquire}>Inquire now <ArrowIcon /></button><a className="hero-link" href="#rooms">Explore rooms <span>↓</span></a></div></div><div className="hero-note"><span className="note-line" />Simple living, thoughtfully cared for.</div></section>;
}

export default Hero;

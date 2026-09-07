import { useState } from 'react';
import './App.css';

const rooms = [
  { name: 'Shared room', detail: 'A bright, comfortable room for two residents.', price: '₱6,500', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80', tags: ['2 beds', 'Shared bath'] },
  { name: 'Private room', detail: 'A quiet personal space with everything you need.', price: '₱9,500', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80', tags: ['1 bed', 'Private bath'] },
  { name: 'Deluxe room', detail: 'Extra space, natural light, and a little more comfort.', price: '₱12,000', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80', tags: ['1 bed', 'Study nook'] },
];

const gallery = [
  { alt: 'Sunlit dormitory exterior', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1100&q=80', className: 'gallery-wide' },
  { alt: 'Warm shared lounge', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80' },
  { alt: 'Cozy bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80' },
  { alt: 'Quiet study corner', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80' },
];

function Brand() {
  return <a className="brand" href="#home" aria-label="Carmelita's Dormitory home"><span className="brand-seal">C</span><span><strong>Carmelita’s</strong><small>DORMITORY</small></span></a>;
}

function ArrowIcon() { return <span className="arrow-icon" aria-hidden="true">↗</span>; }

function Header({ onInquire }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header"><div className="header-inner"><Brand /><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? '×' : '☰'}</button><nav className={`site-nav ${open ? 'is-open' : ''}`}><a href="#about" onClick={close}>About us</a><a href="#rooms" onClick={close}>Rooms</a><a href="#amenities" onClick={close}>Amenities</a><a href="#gallery" onClick={close}>Gallery</a><a href="#contact" onClick={close}>Contact</a><button className="nav-cta" onClick={() => { close(); onInquire(); }}>Inquire now <ArrowIcon /></button></nav></div></header>;
}

function Hero({ onInquire }) {
  return <section className="hero" id="home"><div className="hero-image" /><div className="hero-content"><p className="eyebrow light">A warm place to call home</p><h1>Life feels a little<br /><em>better</em> here.</h1><p className="hero-copy">A welcoming dormitory in the heart of the city, thoughtfully made for students and young professionals.</p><div className="hero-actions"><button className="button button-light" onClick={onInquire}>Inquire now <ArrowIcon /></button><a className="hero-link" href="#rooms">Explore rooms <span>↓</span></a></div></div><div className="hero-note"><span className="note-line" />Simple living, thoughtfully cared for.</div></section>;
}

function SectionHeading({ eyebrow, title, copy, align = '' }) {
  return <div className={`section-heading ${align}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

function About() {
  return <section className="about-section section" id="about"><div className="about-image image-frame"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80" alt="Bright common area at Carmelita's Dormitory" /><span className="image-stamp">Est.<br /><b>2014</b></span></div><div className="about-content"><SectionHeading eyebrow="Our home" title="More than a room. A place to belong." copy="Carmelita’s Dormitory was built around a simple idea: that coming home should feel easy. We bring together clean, comfortable spaces and the kind of care that makes a place feel familiar." /><div className="about-details"><div><strong>10+</strong><span>years of<br />welcoming residents</span></div><div><strong>32</strong><span>thoughtfully<br />planned rooms</span></div><div><strong>24/7</strong><span>support when<br />you need it</span></div></div><a className="inline-link" href="#contact">Get to know us <ArrowIcon /></a></div></section>;
}

function Rooms() {
  return <section className="rooms-section section" id="rooms"><div className="section-heading-row"><SectionHeading eyebrow="Find your fit" title="Rooms made for living." copy="Whether you like the energy of sharing or the quiet of your own space, there’s a room waiting for you." /><a className="inline-link desktop-link" href="#contact">Ask about availability <ArrowIcon /></a></div><div className="room-grid">{rooms.map((room) => <article className="room-card" key={room.name}><div className="room-photo"><img src={room.image} alt={room.name} /><span className="room-price">from <b>{room.price}</b><small>/ month</small></span></div><div className="room-card-body"><h3>{room.name}</h3><p>{room.detail}</p><div className="room-tags">{room.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" className="card-link">View details <ArrowIcon /></a></div></article>)}</div></section>;
}

function Amenities() {
  const services = [{ icon: '⌂', title: 'Furnished spaces', text: 'Move in with less to worry about. Every room comes ready for everyday living.' }, { icon: '⌁', title: 'Reliable essentials', text: 'Wi-Fi, water, electricity, and a clean space are part of your routine here.' }, { icon: '♧', title: 'Shared comforts', text: 'Cook, study, rest, and connect in spaces designed to feel open and welcoming.' }, { icon: '✦', title: 'Caring support', text: 'Our team is nearby and ready to help keep your stay comfortable.' }];
  return <section className="amenities-section section" id="amenities"><div className="amenities-intro"><SectionHeading eyebrow="The essentials" title="Everything you need, already thought through." copy="From practical details to the small comforts, we make daily life feel a little lighter." /><a className="button button-dark" href="#contact">Come take a look <ArrowIcon /></a></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.title}><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>;
}

function Gallery() { return <section className="gallery-section section" id="gallery"><SectionHeading eyebrow="A peek inside" title="Spaces with room to breathe." copy="Take a little look around. The best way to understand Carmelita’s is to experience its calm, warm atmosphere for yourself." align="center" /><div className="gallery-grid">{gallery.map((item) => <div className={`gallery-item ${item.className || ''}`} key={item.alt}><img src={item.image} alt={item.alt} /></div>)}</div></section>; }

function HouseRules() { const rules = ['Quiet hours are observed from 10:00 PM to 6:00 AM.', 'Keep shared spaces clean and welcoming for everyone.', 'Visitors are welcome until 9:00 PM with resident registration.', 'Residents are responsible for their personal belongings.']; return <section className="rules-section section"><div className="rules-card"><div><p className="eyebrow">Good to know</p><h2>Our little house rules.</h2><p>Simple guidelines help everyone enjoy a peaceful, respectful home.</p></div><ul>{rules.map((rule, index) => <li key={rule}><span>0{index + 1}</span>{rule}</li>)}</ul></div></section>; }

function Contact({ onSubmit }) {
  return <section className="contact-section section" id="contact"><div className="contact-copy"><SectionHeading eyebrow="Start a conversation" title="Have a room in mind?" copy="Tell us a little about yourself and we’ll get back to you with current availability, rates, and a tour schedule." /><div className="contact-details"><div><span className="contact-icon">⌖</span><span><b>Find us</b><small>123 Sampaguita Street, Quezon City</small></span></div><div><span className="contact-icon">✆</span><span><b>Call or message</b><small>+63 917 555 0148 · hello@carmelitas.com</small></span></div><div><span className="contact-icon">◷</span><span><b>Visit hours</b><small>Monday to Saturday · 9 AM to 6 PM</small></span></div></div></div><form className="inquiry-form" onSubmit={onSubmit}><div className="form-row"><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@email.com" /></label></div><label>What are you looking for?<select defaultValue=""><option value="" disabled>Select a room type</option><option>Shared room</option><option>Private room</option><option>Deluxe room</option></select></label><label>Message<textarea required placeholder="Tell us your preferred move-in date or ask us anything..." rows="4" /></label><button className="button button-dark" type="submit">Send inquiry <ArrowIcon /></button></form></section>;
}

function Footer() { return <footer className="site-footer"><div className="footer-top"><div><Brand /><p>A warm place to live,<br />managed with care.</p></div><div className="footer-links"><div><b>Explore</b><a href="#about">About us</a><a href="#rooms">Rooms</a><a href="#amenities">Amenities</a></div><div><b>Connect</b><a href="#contact">Contact us</a><a href="#gallery">Instagram</a><a href="#contact">Facebook</a></div></div><a className="back-top" href="#home">Back to top <span>↑</span></a></div><div className="footer-bottom"><span>© 2024 Carmelita’s Dormitory. All rights reserved.</span><span>A little closer to home.</span></div></footer>; }

function App() {
  const [notice, setNotice] = useState(false);
  const handleSubmit = (event) => { event.preventDefault(); setNotice(true); event.currentTarget.reset(); };
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  return <div className="public-site"><Header onInquire={scrollToContact} /><main><Hero onInquire={scrollToContact} /><About /><Rooms /><Amenities /><Gallery /><HouseRules /><Contact onSubmit={handleSubmit} /></main><Footer />{notice && <div className="success-toast" role="status"><span>✓</span><div><b>Inquiry sent</b><small>We’ll be in touch soon. Thank you!</small></div><button onClick={() => setNotice(false)} aria-label="Dismiss">×</button></div>}</div>;
}

export default App;

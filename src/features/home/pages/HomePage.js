import { useState } from 'react';
import '../Home.css';
import About from '../components/About';
import Amenities from '../components/Amenities';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HouseRules from '../components/HouseRules';
import Rooms from '../components/Rooms';
import SuccessToast from '../components/SuccessToast';

function HomePage() {
  const [notice, setNotice] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice(true);
    event.currentTarget.reset();
  };
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return <div className="public-site"><Header onInquire={scrollToContact} /><main><Hero onInquire={scrollToContact} /><About /><Rooms /><Amenities /><Gallery /><HouseRules /><Contact onSubmit={handleSubmit} /></main><Footer />{notice && <SuccessToast onDismiss={() => setNotice(false)} />}</div>;
}

export default HomePage;

import { useState } from 'react';
import './App.css';
import About from '../features/home/components/About';
import Amenities from '../features/home/components/Amenities';
import Contact from '../features/home/components/Contact';
import Footer from '../features/home/components/Footer';
import Gallery from '../features/home/components/Gallery';
import Header from '../features/home/components/Header';
import Hero from '../features/home/components/Hero';
import HouseRules from '../features/home/components/HouseRules';
import Rooms from '../features/home/components/Rooms';
import SuccessToast from '../features/home/components/SuccessToast';

function App() {
  const [notice, setNotice] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice(true);
    event.currentTarget.reset();
  };
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return <div className="public-site"><Header onInquire={scrollToContact} /><main><Hero onInquire={scrollToContact} /><About /><Rooms /><Amenities /><Gallery /><HouseRules /><Contact onSubmit={handleSubmit} /></main><Footer />{notice && <SuccessToast onDismiss={() => setNotice(false)} />}</div>;
}

export default App;

import ArrowIcon from '../../../shared/components/ArrowIcon';
import SectionHeading from '../../../shared/components/SectionHeading';

function About() {
  return <section className="about-section section" id="about"><div className="about-image image-frame"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80" alt="Bright common area at Carmelita's Dormitory" /><span className="image-stamp">Est.<br /><b>2014</b></span></div><div className="about-content"><SectionHeading eyebrow="Our home" title="More than a room. A place to belong." copy="Carmelita’s Dormitory was built around a simple idea: that coming home should feel easy. We bring together clean, comfortable spaces and the kind of care that makes a place feel familiar." /><div className="about-details"><div><strong>10+</strong><span>years of<br />welcoming residents</span></div><div><strong>32</strong><span>thoughtfully<br />planned rooms</span></div><div><strong>24/7</strong><span>support when<br />you need it</span></div></div><a className="inline-link" href="#contact">Get to know us <ArrowIcon /></a></div></section>;
}

export default About;

import ArrowIcon from '../../../shared/components/ArrowIcon';
import SectionHeading from '../../../shared/components/SectionHeading';
import { services } from '../data';

function Amenities() {
  return <section className="amenities-section section" id="amenities"><div className="amenities-intro"><SectionHeading eyebrow="The essentials" title="Everything you need, already thought through." copy="From practical details to the small comforts, we make daily life feel a little lighter." /><a className="button button-dark" href="#contact">Come take a look <ArrowIcon /></a></div><div className="service-grid">{services.map((service) => <article className="service-card" key={service.title}><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>;
}

export default Amenities;

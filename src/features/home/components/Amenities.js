import ArrowIcon from '../../../shared/components/ArrowIcon';
import SectionHeading from '../../../shared/components/SectionHeading';
import ServiceCard from './ServiceCard';
import { services } from '../data';

function Amenities() {
  return <section className="amenities-section section" id="amenities"><div className="amenities-intro"><SectionHeading eyebrow="The essentials" title="Everything you need, already thought through." copy="From practical details to the small comforts, we make daily life feel a little lighter." /><a className="button button-dark" href="#contact">Come take a look <ArrowIcon /></a></div><div className="service-grid">{services.map((service) => <ServiceCard service={service} key={service.title} />)}</div></section>;
}

export default Amenities;

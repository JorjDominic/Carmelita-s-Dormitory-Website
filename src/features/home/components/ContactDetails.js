import { contactDetails } from '../data';

function ContactDetails() {
  return <div className="contact-details">{contactDetails.map((detail) => <div key={detail.title}><span className="contact-icon">{detail.icon}</span><span><b>{detail.title}</b><small>{detail.text}</small></span></div>)}</div>;
}

export default ContactDetails;

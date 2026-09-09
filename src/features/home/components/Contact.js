import SectionHeading from '../../../shared/components/SectionHeading';
import ContactDetails from './ContactDetails';
import InquiryForm from './InquiryForm';

function Contact({ onSubmit }) {
  return <section className="contact-section section" id="contact"><div className="contact-copy"><SectionHeading eyebrow="Start a conversation" title="Have a room in mind?" copy="Tell us a little about yourself and we’ll get back to you with current availability, rates, and a tour schedule." /><ContactDetails /></div><InquiryForm onSubmit={onSubmit} /></section>;
}

export default Contact;

import ArrowIcon from '../../../shared/components/ArrowIcon';

function InquiryForm({ onSubmit }) {
  return <form className="inquiry-form" onSubmit={onSubmit}><div className="form-row"><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@email.com" /></label></div><label>What are you looking for?<select defaultValue=""><option value="" disabled>Select a room type</option><option>Shared room</option><option>Private room</option><option>Deluxe room</option></select></label><label>Message<textarea required placeholder="Tell us your preferred move-in date or ask us anything..." rows="4" /></label><button className="button button-dark" type="submit">Send inquiry <ArrowIcon /></button></form>;
}

export default InquiryForm;

import ArrowIcon from '../../../shared/components/ArrowIcon';
import SectionHeading from '../../../shared/components/SectionHeading';
import { rooms } from '../data';

function Rooms() {
  return <section className="rooms-section section" id="rooms"><div className="section-heading-row"><SectionHeading eyebrow="Find your fit" title="Rooms made for living." copy="Whether you like the energy of sharing or the quiet of your own space, there’s a room waiting for you." /><a className="inline-link desktop-link" href="#contact">Ask about availability <ArrowIcon /></a></div><div className="room-grid">{rooms.map((room) => <article className="room-card" key={room.name}><div className="room-photo"><img src={room.image} alt={room.name} /><span className="room-price">from <b>{room.price}</b><small>/ month</small></span></div><div className="room-card-body"><h3>{room.name}</h3><p>{room.detail}</p><div className="room-tags">{room.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" className="card-link">View details <ArrowIcon /></a></div></article>)}</div></section>;
}

export default Rooms;

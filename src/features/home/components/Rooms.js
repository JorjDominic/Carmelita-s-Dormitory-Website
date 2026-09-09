import ArrowIcon from '../../../shared/components/ArrowIcon';
import SectionHeading from '../../../shared/components/SectionHeading';
import RoomCard from './RoomCard';
import { rooms } from '../data';

function Rooms() {
  return <section className="rooms-section section" id="rooms"><div className="section-heading-row"><SectionHeading eyebrow="Find your fit" title="Rooms made for living." copy="Whether you like the energy of sharing or the quiet of your own space, there’s a room waiting for you." /><a className="inline-link desktop-link" href="#contact">Ask about availability <ArrowIcon /></a></div><div className="room-grid">{rooms.map((room) => <RoomCard room={room} key={room.name} />)}</div></section>;
}

export default Rooms;

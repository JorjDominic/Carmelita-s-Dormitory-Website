import ArrowIcon from '../../../shared/components/ArrowIcon';

function RoomCard({ room }) {
  return <article className="room-card"><div className="room-photo"><img src={room.image} alt={room.name} /><span className="room-price">from <b>{room.price}</b><small>/ month</small></span></div><div className="room-card-body"><h3>{room.name}</h3><p>{room.detail}</p><div className="room-tags">{room.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" className="card-link">View details <ArrowIcon /></a></div></article>;
}

export default RoomCard;

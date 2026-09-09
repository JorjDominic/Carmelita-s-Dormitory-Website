function ServiceCard({ service }) {
  return <article className="service-card"><span className="service-icon">{service.icon}</span><h3>{service.title}</h3><p>{service.text}</p></article>;
}

export default ServiceCard;

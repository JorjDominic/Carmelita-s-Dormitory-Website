function SectionHeading({ eyebrow, title, copy, align = '' }) {
  return <div className={`section-heading ${align}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

export default SectionHeading;

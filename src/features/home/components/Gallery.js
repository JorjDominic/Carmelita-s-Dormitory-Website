import SectionHeading from '../../../shared/components/SectionHeading';
import { gallery } from '../data';

function Gallery() {
  return <section className="gallery-section section" id="gallery"><SectionHeading eyebrow="A peek inside" title="Spaces with room to breathe." copy="Take a little look around. The best way to understand Carmelita’s is to experience its calm, warm atmosphere for yourself." align="center" /><div className="gallery-grid">{gallery.map((item) => <div className={`gallery-item ${item.className || ''}`} key={item.alt}><img src={item.image} alt={item.alt} /></div>)}</div></section>;
}

export default Gallery;

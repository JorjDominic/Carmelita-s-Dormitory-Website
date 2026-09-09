import { useState } from 'react';
import routes from '../../../app/routes';
import ArrowIcon from '../../../shared/components/ArrowIcon';
import Brand from '../../../shared/components/Brand';

function Header({ onInquire }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return <header className="site-header"><div className="header-inner"><Brand /><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? '×' : '☰'}</button><nav className={`site-nav ${open ? 'is-open' : ''}`}>{routes.map((route) => <a href={route.href} key={route.href} onClick={close}>{route.label}</a>)}<button className="nav-cta" onClick={() => { close(); onInquire(); }}>Inquire now <ArrowIcon /></button></nav></div></header>;
}

export default Header;

import { houseRules } from '../data';

function HouseRules() {
  return <section className="rules-section section"><div className="rules-card"><div><p className="eyebrow">Good to know</p><h2>Our little house rules.</h2><p>Simple guidelines help everyone enjoy a peaceful, respectful home.</p></div><ul>{houseRules.map((rule, index) => <li key={rule}><span>0{index + 1}</span>{rule}</li>)}</ul></div></section>;
}

export default HouseRules;

import { houseRules } from '../data';

function HouseRuleList() {
  return <ul>{houseRules.map((rule, index) => <li key={rule}><span>0{index + 1}</span>{rule}</li>)}</ul>;
}

export default HouseRuleList;

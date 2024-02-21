import './App.css';
import charStatsJSON from './general_logic/data/hsr_char_stats.json';
import LandingPage from './components/specific_pages/LandingPage';

const App = () => {
  let baseATK = 0;
  let characterLevel = 2;
  let charName = 'Misha';
  // level key convert to string to index string keys in json
  const levelKey = characterLevel.toString();

  const charStats = charStatsJSON.find(charStats => charStats['Character Name'] === charName);
  if (charStats) {
    const atkObject = charStats.Stats.ATK as { [key: string] : number};
    baseATK = atkObject[levelKey] ?? 0;
  }
  console.log(baseATK);
  return (
    <>
      <LandingPage />
    </>
  )
}

export default App;
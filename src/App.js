import { useState, useEffect } from 'react';
import './App.css';
import ProgressBar from './ProgressBar';
import axios from 'axios';

const APPS_DONE = 0
const GOAL_APPS = 30
const API_KEY = 'RGAPI-d433d034-f284-4fae-9da1-1e24c7f504c0'

const RANK_NUM = {
  'I': 1,
  'II': 2,
  'III': 3,
  'IV': 4
};

const App = () => {
  const [ ateRank, setAteRank ] = useState(4);
  const [ ateTier, setAteTier ] = useState('Bronze');
  const [ ateLP, setAteLP ] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/Op8l0J1oCNQYxLWHgDYSrTbV_6psmLHT6ofu3pVhGpI6HYZe?api_key=${API_KEY}`);
        const tier = response.data[0].tier
        setAteTier(tier.charAt(0) + tier.slice(1).toLowerCase());
        setAteRank(RANK_NUM[response.data[0].rank]);
        setAteLP(response.data[0].leaguePoints);
      } catch (e) {
        console.log(e.response.body);
      }
    }
    fetchData()
  }, )

  return (
    <div className="container">
      <div className="spans-sides">
        <h1 id="top-title" className="title title-sm title-center">The</h1>
        <h1 id="mid-title" className="title title-md title-center"> VS. </h1>
        <h1 id="bot-title" className="title title-sm title-center">Battle of the Century</h1>
      </div>
      <div className="side ate-side">
        <h1 id="ate-title" className="title title-lg ate-title">Ate Leng</h1>
        <h2 className="title title-sm subtitle ate-subtitle">🥈 Road to Silver 🥈</h2>
        <div className="side-content">
          <img src="ate.png" className="face" alt="Ate's face"/>
          <h3 className="progress-header">{`${ateTier} ${ateRank}, ${ateLP}LP`}</h3>
          <ProgressBar percent={ateTier === 'Bronze' ? (((4 - ateRank)*100 + ateLP)*100)/400 : 100} />
        </div>
      </div>
      <div className="side long-side">
        <h1 id="top-title" className="title title-lg long-title">Long Long</h1>
        <h2 className="title title-sm subtitle long-subtitle">💸 Road to Employment 💸</h2>
        <div className="side-content">
          <img src="long.png" className="face" alt="Long's face"/>
          <h3 className="progress-header">{APPS_DONE} Application{APPS_DONE === 1 ? '' : 's'} Done</h3>
          <ProgressBar percent={(APPS_DONE)*100/GOAL_APPS} />
        </div>
      </div>
    </div>
  );
}

export default App;

import DataLoader from 'dataloader';

import fetch from '../fetch';
import key from './key';


const getSummonersByID = (region) => (IDs) =>
  fetch(`https://${region}.api.pvp.net/api/lol/${region}/v1.4/summoner/${IDs.join(',')}?${key}`)
    .then(response => response.json())
    .then(json => IDs.map(id => json[id]))
    .catch(err => { throw err; });

export default (region) => new DataLoader(
  getSummonersByID(region)
);

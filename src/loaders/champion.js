import DataLoader from 'dataloader';
import { reduce, map } from 'ramda';

import fetch from '../fetch';
import key from './key';

// assume that the list of champions never changes, and cache it once.
let allChampions;

const getChampions = (region) => async function(ids) {
  if (!allChampions) {
    allChampions = await fetch(`https://${region}.api.pvp.net/api/lol/static-data/${region}/v1.2/champion?champData=all&${key}`)
      .then(response => response.json())
      .then(json => reduce(
        (acc, champion) => ({ ...acc, [champion.id]: champion }),
        {},
        Object.values(json.data)
      ))
      .catch(err => { throw err; });
  }
  return new Promise(
    (resolve) => {
      resolve(map((id) => allChampions[id], ids));
    }
  );
};

export default (region) => new DataLoader(
  ids => getChampions(region)(ids)
);

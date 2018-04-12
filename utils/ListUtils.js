export function byName(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  
  if (nameA < nameB) {
    return -1;
  }
  
  if (nameA > nameB) {
    return 1;
  }

  return 0;
}

export function byPickRate(a, b) {
  pickrateA = a.count > 0 ? a.picks / a.count : 0;
  pickrateB = b.count > 0 ? b.picks / b.count : 0;

  if (pickrateA < pickrateB) {
    return 1;
  }

  if (pickrateA > pickrateB) {
    return -1;
  }

  return byName(a, b);
}

export function byCountAsc(a, b) {
  return a.count - b.count;
}

export function byCountDesc(a, b) {
  return b.count - a.count;
}

export function byPicksAsc(a, b) {
  return a.picks - b.picks;
}

export function byPicks65Desc(a, b) {
  return b.picks - a.picks;
}

export function shuffle(array) {
  copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
      const rnd = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[rnd]] = [copy[rnd], copy[i]];
  }
  return copy;
}

export function getCombinations(array) {
  return array.length * (array.length - 1) / 2;
}
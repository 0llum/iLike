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

export function byCount(a, b) {
  return a.count - b.count;
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
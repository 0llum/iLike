export function byNameAsc(a, b) {
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

export function byNameDesc(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return 1;
  }

  if (nameA > nameB) {
    return -1;
  }

  return 0;
}

export function byPickRateAsc(a, b) {
  pickrateA = a.count > 0 ? a.picks / a.count : 0;
  pickrateB = b.count > 0 ? b.picks / b.count : 0;

  if (pickrateA < pickrateB) {
    return -1;
  }

  if (pickrateA > pickrateB) {
    return 1;
  }

  return 0;
}

export function byPickRateDesc(a, b) {
  pickrateA = a.count > 0 ? a.picks / a.count : 0;
  pickrateB = b.count > 0 ? b.picks / b.count : 0;

  if (pickrateA < pickrateB) {
    return 1;
  }

  if (pickrateA > pickrateB) {
    return -1;
  }

  return 0;
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

export function byPicksDesc(a, b) {
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

export function findUnmatchedPair(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (element === array[i]) {
      continue;
    }
    matchLeft = element.matches.find(x => x._id === array[i]._id);
    matchRight = array[i].matches.find(x => x._id === element._id);
    if (!matchLeft && !matchRight) {
      return array[i];
    }
  }

  return null;
}

export function getLeastCommonPair(array) {
  array = shuffle(array);
  array.sort(byCountAsc);

  let left = array[0];
  let right = findUnmatchedPair(array, left);

  if (left && right) {
    return [left, right];
  }

  return null;
}

export function getMostPickedPair(array) {
  array = shuffle(array);
  array.sort(byPickRateDesc);

  let left;
  let right;

  for (let i = 0; i < shuffled.length; i++) {
    left = array[i];
    right = findUnmatchedPair(array, left);

    if (right) {
      break;
    }
  }

  if (left && right) {
    return [left, right];
  }

  return null;
}

export function getMostPickedLeastCommonPair(array) {
  array = shuffle(array);
  array.sort(byPickRateDesc);
  array.sort(byCountAsc);

  let left = array[0];
  let right = findUnmatchedPair(array, left);

  if (left && right) {
    return [left, right];
  }

  return null;
}

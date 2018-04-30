export function increaseCount(listId) {
  fetch('https://api.0llum.de/lists/' + listId, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count: 1,
    }),
  });
}

export function increaseItemCount(listId, itemId) {
  fetch('https://api.0llum.de/lists/' + listId + '/' + itemId, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count: 1,
      test: {
        fetch: 3,
      },
    }),
  });
}

export function increaseItemPicks(listId, itemId) {
  fetch('https://api.0llum.de/lists/' + listId + '/' + itemId, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count: 1,
      picks: 1,
    }),
  });
}

export function increaseItemMatchCount(listId, itemId, matchId) {
  fetch('https://api.0llum.de/lists/' + listId + '/' + itemId + '/' + matchId, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count: 1,
    }),
  });
}

export function increaseItemMatchPicks(listId, itemId, matchId) {
  fetch('https://api.0llum.de/lists/' + listId + '/' + itemId + '/' + matchId, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count: 1,
      picks: 1,
    }),
  });
}

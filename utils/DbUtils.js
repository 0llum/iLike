export function increaseCount(listId) {
  fetch('http://0llum.de:3000/lists/' + listId, {
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
  fetch('http://0llum.de:3000/lists/' + listId + '/' + itemId, {
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

export function increaseItemPicks(listId, itemId) {
  fetch('http://0llum.de:3000/lists/' + listId + '/' + itemId, {
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
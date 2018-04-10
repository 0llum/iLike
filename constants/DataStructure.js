export default [{
  id: 0,                        // id of list
  title: 'ABC',                 // title of list
  color: '#FFFFFF',             // color of list
  data: [{                      // list entries
    id: 0,                      // id of entry
    name: 'A',                  // name of entry
    color: '#FF0000',           // color of entry
    count: 0,                   // how often the entry appeared on a tile
    picks: 0,                   // how often the entry was picked
    matches: [{                 // list of opponents
      id: 1,                    // id of opponent
      count: 0,                 // how often the entry appeared against the opponent
      picks: 0                  // how often the entry beat the opponent
    }, {                        // ...
      id: 2,
      count: 0,
      picks: 0
    }]
  }, {
    id: 1,
    name: 'B',
    color: '#00FF00',
    count: 0,
    picks: 0,
    matches: [{
      id: 0,
      count: 0,
      picks: 0
    }, {
      id: 2,
      count: 0,
      picks: 0
    }]
  }, {
    id: 2,
    name: 'C',
    color: '#0000FF',
    count: 0,
    picks: 0,
    matches: [{
      id: 0,
      count: 0,
      picks: 0
    }, {
      id: 1,
      count: 0,
      picks: 0
    }]
  }]
}]
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

import pokemons from './pokemons.json';


const app = express();
app.use(cors());

const pcUrl = 'http://pokeapi.co/api/v2/pokemon/';


// Done
// Routes
app.get('/', (req, res) => {
  const poks = pokemons;
//	res.json(pokemons);
  poks.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a должно быть равным b
    return 0;
  });
  if (!req.query.limit && !req.query.offset) {
    const result = [];
    let i = 0;
    pokemons.forEach((p) => { if (i < 20) {result.push(p.name); } i +=1; });
    res.json(result);
  } else {
    const result = [];
    let limit = 0;
    let offset = 0;
    if (!req.query.limit) { limit = 20; } else { limit = req.query.limit; }
    console.log(limit);
    if (!req.query.offset) { offset = 0; } else { offset = req.query.offset; }
    console.log(offset);
    let i = 0;
    pokemons.forEach((p) => { if ( i >= offset && i < (+offset + +limit)) { console.log(i); result.push(p.name); } i +=1; });
    res.json(result);
  }
  //res.json(pokemons);
});

app.get('/test', (req, res) => {
  res.json(pokemons);
});

app.get('/:data', (req, res) => {
   const poks = pokemons;
   const data = req.params.data;
   let type = '';
   if (data === 'huge') { type = 'height'; }
   if (data === 'heavy') { type = 'weight'; }
   if (data === 'light') { type = 'weight'; }
   if (data === 'micro') { type = 'height'; }
   if (data === 'angular' || data === 'fat') {
     poks.sort(function (a, b) {
       if (data === 'angular') {
         if ((a.weight / a.height) > (b.weight / b.height)) {
           return 1;
         }
         if ((a.weight / a.height) < (b.weight / b.height)) {
           return -1;
         }
     } else {
       if ((a.weight / a.height) < (b.weight / b.height)) {
         return 1;
       }
       if ((a.weight / a.height) > (b.weight / b.height)) {
         return -1;
       }
     }
       // a должно быть равным b
       if (a.name > b.name) {
         return 1;
       }
       if (a.name < b.name) {
         return -1;
       }
     });
   } else if (data === 'micro' || data === 'light') {
     poks.sort(function (a, b) {
       if (a[type] > b[type]) {
         return 1;
       }
       if (a[type] < b[type]) {
         return -1;
       }
       // a должно быть равным b
       if (a.name > b.name) {
         return 1;
       }
       if (a.name < b.name) {
         return -1;
       }
     });
   } else {
            poks.sort(function (a, b) {
            if (a[type] < b[type]) {
              return 1;
            }
            if (a[type] > b[type]) {
              return -1;
            }
            // a должно быть равным b
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
          });
}
  if (!req.query.limit && !req.query.offset) {
    const result = [];
    let i = 0;
    pokemons.forEach((p) => { if (i < 20) {result.push(p.name); } i +=1; });
    res.json(result);
  } else {
    const result = [];
    let limit = 0;
    let offset = 0;
    if (!req.query.limit) { limit = 20; } else { limit = req.query.limit; }
    console.log(limit);
    if (!req.query.offset) { offset = 0; } else { offset = req.query.offset; }
    console.log(offset);
    let i = 0;
    pokemons.forEach((p) => { if ( i >= offset && i < (+offset + +limit)) { console.log(i); result.push(p.name); } i +=1; });
    res.json(result);
  }

});


// Listen port 3000
app.listen(3000, () => {
  console.log('[INFO] Example app listening on port 3000!');
});

# crawler

## Usage

```
$ npm install

$ npm start
```

#### Directory & File Structure

```bash
├── bin/
│   └── index.js
|
└── package.json
```

## Demo

```js
/* bootstrap */
(async () => {
  // const data = await search('2021-01-05')
  // const data = await search('2021-01-05', '2021-01-07')
  // const data = await search() /* today */
})();
```

```
2021-01-05 Done..

2021-01-06 Done..

2021-01-07 Done..

2021-01-05 325 {
  name: '(활)가리비',
  area: '마산',
  standard: '중',
  package: 'box',
  quantity: 15,
  high_price: 25000,
  low_price: 23500,
  avg_price: 24000
}

2021-01-06 329 {
  name: '(활)가리비',
  area: '마산',
  standard: '중',
  package: 'box',
  quantity: 19,
  high_price: 24500,
  low_price: 22200,
  avg_price: 23100
}

2021-01-07 293 {
  name: '(선)가자미',
  area: '안흥',
  standard: '중',
  package: 'kg',
  quantity: 443.3,
  high_price: 3000,
  low_price: 3000,
  avg_price: 3000
}
```

## Requirements

- [axios](https://github.com/axios/axios)
- [jsdom](https://github.com/jsdom/jsdom)
- [dayjs](https://www.npmjs.com/package/dayjs)

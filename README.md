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
│
├── .env.json
│
└── package.json
```

## Demo

```js
/* bootstrap */
(async () => {

    const { ID_TOKEN, PW_TOKEN } = process.env

    await login(ID_TOKEN, PW_TOKEN)
    await mytmon()
    await cart()

})()
```
```
/* login - http://m.ticketmonster.co.kr/user/login */
{ success: true, name: '유명재님' }

/* mytmon - http://m.ticketmonster.co.kr/mytmon/list */
마이티몬 - 티몬 모바일

/* cart - http://order.ticketmonster.co.kr/m/cart */
[
    {
        name: '[슈퍼마트] 생칵테일새우450g',
        price: '9,900',
        quantity: '1',
        url: 'http://mobile.ticketmonster.co.kr/deals/1061188318'
    },
    {
        name: '[슈퍼마트] 노르웨이 생연어 300g이상',
        price: '9,900',
        quantity: '1',
        url: 'http://mobile.ticketmonster.co.kr/deals/1717224306'
    },
    {
        name: '[슈퍼마트] 자연애찬 특란 30개',
        price: '3,690',
        quantity: '1',
        url: 'http://mobile.ticketmonster.co.kr/deals/1010280606'
    }
]
```

## Requirements
- [axios](https://github.com/axios/axios)
- [axios-cookiejar-support](https://github.com/3846masa/axios-cookiejar-support)
- [tough-cookie](https://github.com/salesforce/tough-cookie)
- [jsdom](https://github.com/jsdom/jsdom)
- [json-dotenv](https://github.com/myungjaeyu/json-dotenv)
const axios = require('axios').default

const stringify = require('qs').stringify
const JSDOM = require('jsdom').JSDOM

async function mytmon() {

    const url = 'http://m.ticketmonster.co.kr/mytmon/list'

    const { data } = await axios.get(url, { withCredentials: true })


    const dom = new JSDOM(data)
    const title = dom.window.document.querySelector('title').textContent

    console.log(title)
}


async function cart() {

    const url = 'http://order.ticketmonster.co.kr/m/cart'

    const { data } = await axios.get(url, { jar, withCredentials: true })

    const parser = (element, content) => Object.keys(content).reduce((acc, cur) => {
        acc[cur] = element.querySelector(content[cur]).textContent
        return acc
    }, {})


    const dom = new JSDOM(data)

    const list = Array.from(dom.window.document.querySelectorAll('.prod')).map(elem => ({
        ...parser(elem, {
            name : '.prod_name', 
            price : '.price .num',
            quantity : '.quantity',
        }),
        url : 'http://mobile.ticketmonster.co.kr/deals/' + elem.dataset.dealSrl
    }))

    console.log(list)
}


/* bootstrap */
(async () => {

    await mytmon()
    await cart()

})()
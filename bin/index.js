require('json-dotenv')()

const axiosCookieJarSupport = require('axios-cookiejar-support').default
const axios = require('axios').default

const stringify = require('qs').stringify
const JSDOM = require('jsdom').JSDOM

const CookieJar = require('tough-cookie').CookieJar

axiosCookieJarSupport(axios)
const jar = new CookieJar()


async function login(id_token, pw_token) {

    const url = 'http://m.ticketmonster.co.kr/user/login'

    const body = stringify({
        id : id_token,
        pw : pw_token,
        returnUrl : 'http://m.ticketmonster.co.kr/mytmon/list'
    })

    const headers = {
        Referer: 'http://m.ticketmonster.co.kr/user/login'
    }

    const { data } = await axios.post(url, body, { headers, jar, withCredentials: true })


    const dom = new JSDOM(data)
    const name = dom.window.document.querySelector('.info_level .txt1')

    console.log({ success : !!name, ...( name && { name : name.textContent }) })
}


async function mytmon() {

    const url = 'http://m.ticketmonster.co.kr/mytmon/list'

    const { data } = await axios.get(url, { jar, withCredentials: true })


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

    const { ID_TOKEN, PW_TOKEN } = process.env

    await login(ID_TOKEN, PW_TOKEN)
    await mytmon()
    await cart()

})()
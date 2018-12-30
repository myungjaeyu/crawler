require('json-dotenv')()

const axiosCookieJarSupport = require('axios-cookiejar-support').default
const axios = require('axios').default

const stringify = require('qs').stringify
const JSDOM = require('jsdom').JSDOM

const CookieJar = require('tough-cookie').CookieJar

axiosCookieJarSupport(axios)
const jar = new CookieJar()

/* cookiejar example
axios.get('http://m.ticketmonster.co.kr', { jar, withCredentials: true }).then(e => console.log(jar, e.config.jar === jar)) */


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
    const name = dom.window.document.querySelector('.info_level .txt1').textContent

    console.log({ success : !!name, name})
}

/* bootstrap */
(async () => {

    const { ID_TOKEN, PW_TOKEN } = process.env

    await login(ID_TOKEN, PW_TOKEN)

})()
const axiosCookieJarSupport = require('axios-cookiejar-support').default
const axios = require('axios').default

const CookieJar = require('tough-cookie').CookieJar

axiosCookieJarSupport(axios)
const jar = new CookieJar()

axios.get('http://m.ticketmonster.co.kr', {
    jar,
    withCredentials: true
})
.then(e => {

    console.log(jar)

    console.log(e.config.jar === jar)

})
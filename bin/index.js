const dayjs = require('dayjs')

const axios = require('axios').default

const stringify = require('qs').stringify
const JSDOM = require('jsdom').JSDOM

const url = 'https://www.susansijang.co.kr/nsis/mim/info/mim9030'

const headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
}

async function page(pageIndex, searchYear, searchMonth, searchDate) {

    const body = stringify({
        pageIndex,
        pageUnit: 20,
        pageSize: 1,
        kdfshNm: '',
        searchYear,
        searchMonth,
        searchDate
    })

    const { data } = await axios.post(url, body, { headers, withCredentials: true })

    const text = (element, index) => element.children[index].textContent

    const parser = (element) => ({
        name: text(element, 0),
        area: text(element, 1),
        standard: text(element, 2),
        package: text(element, 3),
        quantity: +text(element, 4).replace(/,/, ''),
        high_price: +text(element, 5).replace(/,/, ''),
        low_price: +text(element, 6).replace(/,/, ''),
        avg_price: +text(element, 7).replace(/,/, ''),
    })


    const dom = new JSDOM(data)

    const elements = dom.window.document.querySelectorAll('.data_table tr')

    if (elements.length < 3) return []

    const list = Array.from(elements).map(elem => ({
        ...parser(elem)
    }))

    return list

}

async function fish(year, month, day) {

    let is_len = true,
        page_index = 1,
        list = []

    while (is_len) {
        arr = await page(page_index, year, month, day)

        is_len = !!arr.length
        page_index++

        list = list.concat(arr)
    }

    return list.slice(1)

}

async function search(head_date, tail_date) {

    let equal = false,
        head = head_date || dayjs().format('YYYY-MM-DD'),
        tail = tail_date || head,
        data = {}

    while (!equal) {

        const [ year, month, day ] = dayjs(head).format('YYYY MM DD').split(' ')

        const list = await fish(year, month, day)

        console.log(head, 'Done..')

        equal = head === tail

        data[head] = list

        if (head && head !== tail) head = dayjs(head).add(1, 'day').format('YYYY-MM-DD')

    }

    return data

}

/* bootstrap */
(async () => {

    // const data = await search('2021-01-05')
    // const data = await search('2021-01-05', '2021-01-07')
    const data = await search() /* today */

    Object.keys(data).forEach(key => console.log(key, data[key].length, data[key][0]))

})()
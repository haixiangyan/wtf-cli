const axios = require('axios')
const cheerio = require('cheerio')

const term = process.argv[2]

const instance = axios.create({
  baseURL: 'https://www.abbreviations.com',
});

instance({
  url: `/${term}`,
})
.then(response => {
  const html = response.data
  const $ = cheerio.load(html)
  $('p.desc').each((index, element) => {
    console.log($(element).text())
  })
})

#!/usr/bin/env node
const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://www.abbreviations.com'

// Get input
if (process.argv.length !== 3) {
    console.log('Example: wth lol')
    return
}

const term = process.argv[2]
console.log('Looking for ' + term)

// Send request
axios.get(`${baseURL}/${term}`)
    .then(response => {
        // Get raw html
        const html = response.data
        // Transfer to DOM
        const $ = cheerio.load(html)
        // Get all description on first page
        $('p.desc').each((index, element) => {
            console.log($(element).text())
        })
    })
    .catch(error => {
        console.log(error)
    })

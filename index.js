#!/usr/bin/env node
const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://www.abbreviations.com'

// Validate keyword
if (process.argv.length !== 3) {
    console.log('Example: wth lol')
    return
}

// Get keyword
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
            // Skip the first one
            if (index === 0) {
              return
            }
            console.log($(element).text())
        })
    })
    .catch(error => {
        console.log(error)
    })

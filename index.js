#!/usr/bin/env node
const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://www.abbreviations.com'

// Get input
const term = process.argv[2]
console.log('Looking for ' + term)

// Send request
axios.get({
    url: `${baseURL}/${term}`,
})
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

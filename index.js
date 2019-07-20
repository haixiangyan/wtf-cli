#!/usr/bin/env node
const axios = require('axios')
const cheerio = require('cheerio')
const chalk = require('chalk')
const ora = require('ora')

const baseURL = 'https://www.abbreviations.com'

// Validate keyword
if (process.argv.length !== 3) {
    console.log('Usage: wtf wtf')
    return
}

// Get keyword
const term = process.argv[2]
console.log(chalk.red('##############################'))
const spinner = ora(chalk.blue('Looking for ' + term + '...')).start();

// Send request
axios.get(`${baseURL}/${term}`)
    .then(response => {
        // Stop loading
        spinner.stop()
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
            console.log(chalk.yellow((index)) + '. ' + $(element).text())
        })
        console.log(chalk.red('##############################'))
    })
    .catch(error => {
        console.log(error)
    })

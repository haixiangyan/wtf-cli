#!/usr/bin/env node
const axios = require('axios')
const cheerio = require('cheerio')
const chalk = require('chalk')
const ora = require('ora')
const table = require('table').table

const baseURL = 'https://www.abbreviations.com'

const config = {
    columns: {
        0: {
            alignment: 'left',
            width: 10
        },
        1: {
            alignment: 'center',
            width: 10
        },
        2: {
            alignment: 'right',
            width: 10
        }
    }
};

// Validate keyword
if (process.argv.length !== 3) {
    console.log('Usage: wtf wtf')
    return
}

// Get keyword
const term = process.argv[2]
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

        let results = []
        // Get all description on first page
        $('tbody p.desc').each((index, element) => {
            // Skip header
            if (index === 0) {
                return
            }
            // Add description
            results.push([
                chalk.yellow(index),
                $(element).text(),
                ''
            ])
        })
        // Get all ratings
        $('tbody span.sc').each((index, element) => {
            // Update ratings
            results[index][2] = rate(5, cheerio(element).find('span.sf').length)
        })

        // Print results
        printResults(results)
    })
    .catch(error => {
        console.log(error)
    })

// Print out formatted results
function printResults(results) {
    console.log(chalk.red('##############################'))

    console.log(table(results))

    console.log(chalk.red('##############################'))
}

// Get ratings styles
function rate(total, likes) {
    let ratings = ''
    for (let i = 0; i < total; i++) {
        if (i < likes) {
            ratings += chalk.green('+')
        }
        else {
            ratings += chalk.red('-')
        }
    }
    return ratings
}
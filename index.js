#!/usr/bin/env node
const axios = require('axios')
const chalk = require('chalk')
const ora = require('ora')
const table = require('table').table
const secret = require('./secret')

// Validate keyword
if (process.argv.length !== 3) {
    console.log('Usage: wtf wtf')
    return
}

// Get keyword
const term = process.argv[2]
const spinner = ora(chalk.blue('Looking for ' + term + '...')).start();

// Send request
axios.get(makeRequestUrl(term))
    .then(response => {
        // Stop loading
        spinner.stop()

        let results = [['No.', 'Description', 'Rating']]

        // Get top 10
        const top10 = response.data.result.slice(0, 10)

        top10.forEach((meaning, index) => {
            // Add description
            results.push([
                chalk.yellow(index),
                meaning.definition,
                rate(5, meaning.score)
            ])
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

// Make request url
function makeRequestUrl(term) {
    return `https://www.abbreviations.com/services/v2/abbr.php?uid=${secret.userId}&tokenid=${secret.token}&term=${term}&format=json`
}
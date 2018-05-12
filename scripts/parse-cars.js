'use strict'

let assert = require('assert')
let fs = require('fs')

const PATH = process.argv[2]

function loadLines (p) {
  let str = fs.readFileSync(p, 'ascii')
  let lines = str.split(/\n/)

  return lines.filter(line => {
    return line.split(',').length === 4
  })
}

function loadCars (lines) {
  return lines.map(line => {
    let row = line.split(',')

    assert(row.length === 4, row)

    let mpg = parseInt(row[0])
    let manufacturer = row[1]
    let model = row[2]
    let year = parseInt(row[3])

    let kpl = Math.round(mpg / 3.78541 * 1.60934)

    assert(kpl && mpg && manufacturer && model && year)

    return { kpl, manufacturer, model, year }
  })
}

function processCars (cars) {
  let menu = {}

  cars.forEach(({ manufacturer, model, year, kpl }) => {
    let x = (menu[year] = menu[year] || {})
    let y = (x[manufacturer] = x[manufacturer] || {})
    y[model] = kpl
  })

  return menu
}

function stringify (json) {
  return JSON.stringify(json)
}

let lines = loadLines(PATH)
let cars = loadCars(lines)
let json = processCars(cars)
let string = stringify(json)

console.log(string)

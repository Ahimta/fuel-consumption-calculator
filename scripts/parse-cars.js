'use strict'

let assert = require('assert'),
    path = require('path'),
    fs = require('fs')

const PATH = process.argv[2]

function loadLines (p)
{
  let str = fs.readFileSync(p, 'ascii')
  let lines = str.split(/\n/)

  return lines.filter(line => { return line.split(',').length === 4})
}

function loadCars (lines)
{
  return lines.map(line =>
  {
    let row = line.split(',')

    assert(row.length === 4, row)

    let mpg = parseInt(row[0]),
        manufacturer = row[1],
        model = row[2],
        year = parseInt(row[3])

    let kpl = Math.round(mpg / 3.78541 * 1.60934)

    assert(kpl && mpg && manufacturer && model && year)

    return {kpl, manufacturer, model, year}
  })
}

function processCars (cars)
{
  let menu = {}

  cars.forEach(({manufacturer, model, year, kpl}) =>
  {
    let x = menu[year] = (menu[year] || {})
    let y = x[manufacturer] = (x[manufacturer] || {})
    let z = y[model]  = kpl
  })

  return menu
}

function stringify (json)
{
  return JSON.stringify(json)
}

function countCars (json)
{
  let count = 0

  Object.keys(json).forEach(manufacturer =>
  {
    Object.keys(json[manufacturer]).forEach(model =>
    {
      count += Object.keys(model).length
    })
  })

  return count
}

let lines = loadLines(PATH)
let cars = loadCars(lines)
let json = processCars(cars)
let string = stringify(json)
let count = countCars(json)

console.log(string)
// console.log(lines.length, cars.length, count)
// console.log(json['Mercury']['Grand Marquis'][1992])
// console.log(Object.keys(json['Toyota']).sort().length)
// console.log(Object.keys(json[2016]['GMC']).sort())

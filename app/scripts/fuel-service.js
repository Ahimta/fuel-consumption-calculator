'use strict'

angular.module('fuelCalculator').service('fuelService', function ()
{
  var DAY = 'يوم'
  var WEEK = 'اسبوع'
  var MONTH = 'شهر'
  var YEAR = 'سنة'

  var PERIOD_TABLE = [[DAY, 1], [WEEK, 7], [MONTH, 30], [YEAR, 360]]

  function getPeriodTable ()
  {
    return PERIOD_TABLE
  }

  function calculateDistance (distanceForLiters, litersForDistance, volume)
  {
    return Math.round(distanceForLiters / litersForDistance * volume)
  }

  function getLiterPrice (priceType, fuelType)
  {
    if (priceType === 'new') { return fuelType === '91' ? 0.75 : 0.90 }
    else                     { return fuelType === '91' ? 0.45 : 0.60 }
  }

  function calculateByVolume (priceType, fuelType, volume) { return volume * getLiterPrice(priceType, fuelType) }

  function calculateByDistance (priceType, fuelType, distanceForLiters, litersForDistance, distance)
  {
    var literPerKilometer = litersForDistance / distanceForLiters
    var volume = literPerKilometer * distance

    return calculateByVolume(priceType, fuelType, volume)
  }

  this.calculateByDistance = calculateByDistance
  this.calculateByVolume = calculateByVolume
  this.calculateDistance = calculateDistance

  this.getPeriodTable = getPeriodTable
  this.getLiterPrice = getLiterPrice
})

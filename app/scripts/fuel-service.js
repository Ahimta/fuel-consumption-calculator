'use strict'

angular.module('fuelCalculator').service('fuelService', function ()
{

  function calculateDistanceByVolume (distanceForLiters, litersForDistance, volume)
  {
    return distanceForLiters / litersForDistance * volume
  }

  function getLiterPrice (priceType, fuelType)
  {
    if (priceType === 'new') { return fuelType === '91' ? 0.75 : 0.90 }
    else                     { return fuelType === '91' ? 0.45 : 0.60 }
  }

  function calculateLitersByPrice (priceType, fuelType, price)
  {
    var pricePerLiter = getLiterPrice(priceType, fuelType)
    var volume = price / pricePerLiter

    return volume
  }

  function calculateDistanceByPrice (priceType, fuelType, distanceForLiters, litersForDistance, price)
  {
    var volume = calculateLitersByPrice(priceType, fuelType, price)
    var distance = volume * distanceForLiters / litersForDistance

    return distance
  }

  function calculateByVolume (priceType, fuelType, volume) { return volume * getLiterPrice(priceType, fuelType) }

  function calculateByDistance (priceType, fuelType, distanceForLiters, litersForDistance, distance)
  {
    var literPerKilometer = litersForDistance / distanceForLiters
    var volume = literPerKilometer * distance

    return calculateByVolume(priceType, fuelType, volume)
  }

  this.roundPrice = function (price)
  {
    if (price < 10) { return price             }
    else            { return Math.round(price) }
  }

  this.calculateByDistance = calculateByDistance
  this.calculateByVolume = calculateByVolume

  this.calculateDistanceByVolume = calculateDistanceByVolume
  this.calculateDistanceByPrice = calculateDistanceByPrice

  this.getLiterPrice = getLiterPrice
})
